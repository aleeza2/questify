import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { getUsername } from "../utils/auth";
import {
  dayKeyOf, loadResults, saveResult, formatTime, getDailySet
} from "../utils/fon";
import { MEDIA_POOL } from "../data/fonPool";

const DAILY_COUNT = 5; // change to any number

export default function FakeOrNotPlay() {
  const navigate = useNavigate();

  const userId = getUsername(); // e.g., "alice@email.com"

  const dayKey = dayKeyOf();

  useEffect(() => {
    const r = loadResults(userId);
    if (r[dayKey]) navigate("/fake-or-not", { replace: true });
  }, [userId, dayKey, navigate]);

  const items = useMemo(
    () => getDailySet(dayKey, DAILY_COUNT, MEDIA_POOL),
    [dayKey]
  );

  // Gameplay state
  const [idx, setIdx] = useState(0);
  const current = items[idx];
  const [choice, setChoice] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  // Fire rain particles on wrong
  const [embers, setEmbers] = useState([]);

  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);
  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed((t) => t + 10), 10);
    return () => clearInterval(timerRef.current);
  }, []);

  function pulseBodyBackground(kind, ms = 1200) {
    const cls = kind === "success" ? "bg-pulse-green" : "bg-pulse-red";
    document.body.classList.add(cls);
    setTimeout(() => document.body.classList.remove(cls), ms);
  }

  function burstConfetti(durationMs = 1200) {
    const end = Date.now() + durationMs;
    (function frame() {
      confetti({ particleCount: 10, startVelocity: 35, spread: 70, origin: { x: 0,   y: 0.1 } });
      confetti({ particleCount: 10, startVelocity: 35, spread: 70, origin: { x: 1,   y: 0.1 } });
      confetti({ particleCount: 10, startVelocity: 45, spread: 120, origin: { x: 0.5, y: 0 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }

  function fireRain(durationMs = 1200, count = 100) {
    const arr = Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 150,
      duration: 900 + Math.random() * 900,
      scale: 0.6 + Math.random() * 0.9
    }));
    setEmbers(arr);
    setTimeout(() => setEmbers([]), durationMs + 200);
  }

  function submitOne() {
    if (!choice) return;

    const isCorrect = choice === (current.isFake ? "fake" : "real");
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      pulseBodyBackground("success", 1200);
      burstConfetti(1400);
    } else {
      pulseBodyBackground("fail", 1200);
      fireRain(1400, 100);
    }

    // Advance or finish
    if (idx < items.length - 1) {
      setIdx(idx + 1);
      setChoice(null);
    } else {
      // Finish run
      clearInterval(timerRef.current);
      const record = {
        itemIds: items.map((it) => it.id),
        total: items.length,
        correctCount: isCorrect ? correctCount + 1 : correctCount,
        ms: elapsed,
        ts: Date.now(),
      };
      saveResult(userId, dayKey, record);
      setTimeout(() => navigate("/fake-or-not", { replace: true }), 900);
    }
  }

  if (!current) return null;

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen px-4 py-6">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigate("/fake-or-not")}
            className="px-3 py-1 rounded bg-stone-200 hover:bg-stone-300"
          >
            ← Back
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-stone-200 text-stone-900 font-mono">
              {formatTime(elapsed)}
            </span>
            <span className="text-stone-600">
              {idx + 1} / {items.length} • Score {correctCount}/{items.length}
            </span>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg ring-2 ring-medievalBrown/20 mb-6 bg-black/5">
          {current.mediaType === "video" ? (
            <video src={current.mediaUrl} className="w-full h-auto" controls playsInline />
          ) : (
            <img src={current.mediaUrl} alt={current.title} className="w-full h-auto object-contain" />
          )}
        </div>

        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => setChoice("real")}
            className={`px-5 py-3 rounded-xl border-2 font-semibold transition ${
              choice === "real" ? "bg-green-700/90 text-white border-green-800" : "bg-green-100 text-green-900 border-green-300 hover:bg-green-200"
            }`}
          >
            🏰 Real
          </button>
          <button
            onClick={() => setChoice("fake")}
            className={`px-5 py-3 rounded-xl border-2 font-semibold transition ${
              choice === "fake" ? "bg-red-700/90 text-white border-red-800" : "bg-red-100 text-red-900 border-red-300 hover:bg-red-200"
            }`}
          >
            🐉 Fake
          </button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={submitOne}
            disabled={!choice}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              choice ? "bg-medievalGold text-black hover:bg-medievalBrown hover:text-white" : "bg-stone-300 text-stone-500 cursor-not-allowed"
            }`}
          >
            {idx < items.length - 1 ? "Submit & Next" : "Submit Final"}
          </button>
        </div>
      </div>

      {/* falling embers on wrong */}
      {embers.length > 0 && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-40">
          {embers.map((e, i) => (
            <span
              key={i}
              className="ember"
              style={{
                left: `${e.left}%`,
                animationDuration: `${e.duration}ms`,
                animationDelay: `${e.delay}ms`,
                transform: `scale(${e.scale})`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
