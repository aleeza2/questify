// server/api/verify/index.js
import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import OpenAI from "openai";

const router = express.Router();

const PROVIDER = (process.env.AI_PROVIDER || "ollama").toLowerCase();
const HAVE_OPENAI = !!process.env.OPENAI_API_KEY;

// only create the client if we’re actually using openai
let openaiClient = null;
if (PROVIDER === "openai" && HAVE_OPENAI) {
  openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.1:8b";

const SATIRE_DOMAINS = [
  "babylonbee.com",
  "theonion.com",
  "newsthump.com",
  "thebeaverton.com",
  "thebetootaadvocate.com",
  "waterfordwhispersnews.com",
];

function hostOf(u) {
  try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; }
}

function ruleCheck(url, text) {
  const host = hostOf(url);
  if (SATIRE_DOMAINS.some(d => host.endsWith(d))) {
    return { status: "fake", message: "🎯 Satire domain", reason: `Satire site (${host})`, source: "rules" };
  }
  return null;
}

async function fetchText(url) {
  const res = await fetch(url, { timeout: 15000 });
  const html = await res.text();
  const $ = cheerio.load(html);
  $("script,style,noscript,svg,iframe").remove();
  return $("body").text().replace(/\s+/g, " ").trim();
}

async function callOllama(prompt) {
  const r = await fetch(`${OLLAMA_HOST}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: OLLAMA_MODEL, prompt, stream: false }),
  });
  const j = await r.json();
  return j.response;
}

async function callOpenAI(prompt) {
  const r = await openaiClient.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Return ONLY JSON: {\"verdict\":\"fake|real\",\"confidence\":0-100,\"short_reason\":\"...\"}" },
      { role: "user", content: prompt },
    ],
  });
  return r.choices[0].message.content;
}

router.post("/", async (req, res) => {
  const { url } = req.body || {};
  if (!url || !/^https?:\/\//i.test(url)) {
    return res.status(400).json({ status: "invalid", message: "❌ That’s not a valid link." });
  }

  console.log(`[${new Date().toISOString()}] POST /api/verify body:`, req.body);

  try {
    const text = (await fetchText(url)).slice(0, 6000);

    // quick rules first (fast + free)
    const ruled = ruleCheck(url, text);
    if (ruled) return res.json(ruled);

    const prompt = `
You are a careful fact-check assistant. Decide if this article is satire/fake or real.
Return ONLY JSON like: {"verdict":"fake|real","confidence":0-100,"short_reason":"..."}.

URL: ${url}
TEXT:
${text}
    `.trim();

    let answer, providerUsed;
    if (PROVIDER === "openai" && HAVE_OPENAI) {
      providerUsed = "openai";
      answer = await callOpenAI(prompt);
    } else {
      providerUsed = "ollama";
      answer = await callOllama(prompt);
    }

    // try to parse a JSON object from the model output
    let parsed = null;
    try {
      const match = answer.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : null;
    } catch { /* ignore */ }

    const verdict = (parsed?.verdict || "").toLowerCase();
    const reason = parsed?.short_reason || answer;

    if (verdict === "fake") {
      return res.json({
        status: "fake",
        message: "🎉 Congrats, adventurer! You spotted a fake scroll.",
        reason, provider: providerUsed,
      });
    }
    if (verdict === "real") {
      return res.json({
        status: "real",
        message: "😅 That one’s legit. No XP, but nice try.",
        reason, provider: providerUsed,
      });
    }

    return res.json({
      status: "error",
      message: "⚠️ The oracle could not decide.",
      reason: answer,
      provider: providerUsed,
    });
  } catch (err) {
    console.error("verify error:", err);
    return res.status(500).json({ status: "error", message: "⚠️ The oracle choked on this scroll." });
  }
});

export default router;
