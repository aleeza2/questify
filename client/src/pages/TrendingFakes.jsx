import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TRENDING_FAKES } from "../data/trendingFakes";
import { getUsername } from "../utils/auth";

// Per-user bookmarks in localStorage
const SAVED_PREFIX = "tf_saved_";
const savedKey = (user) => SAVED_PREFIX + encodeURIComponent((user || "guest").toLowerCase());

function useSaved() {
  const user = getUsername();
  const key = savedKey(user);
  const [saved, setSaved] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(key) || "[]")); } catch { return new Set(); }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify([...saved])); } catch {}
  }, [key, saved]);
  const toggle = (id) =>
    setSaved((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  return { saved, toggle };
}

const TYPES = ["All", "Image", "Video", "Claim", "AI/Deepfake"];

export default function TrendingFakes() {
  const { saved, toggle } = useSaved();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TRENDING_FAKES
      .filter((a) =>
        (type === "All" || a.type === type || (type === "AI/Deepfake" && a.title.toLowerCase().includes("ai")))
      )
      .filter((a) =>
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      )
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }, [query, type]);

  const hero = filtered[0];
  const justIn = filtered.slice(1, 7);
  const more = filtered.slice(7);

  return (
    <div className="min-h-screen px-4 md:px-8 py-8">
      {/* Top bar */}
      <div className="mx-auto max-w-6xl flex flex-col gap-4 md:gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl md:text-5xl font-serif text-medievalRed">🔥 Trending Fakes</h1>
          <div className="hidden md:flex gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-2 rounded-full border transition text-sm ${
                  type === t ? "bg-medievalBrown text-white border-medievalBrown" : "bg-white/70 border-stone-300 hover:bg-stone-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search claims, topics, categories..."
            className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-stone-300 bg-white/80 outline-none focus:ring-2 focus:ring-medievalBrown"
          />
          <div className="md:hidden">
            <select
              className="px-3 py-3 rounded-xl border border-stone-300 bg-white/80"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hero */}
          <div className="lg:col-span-2">
            {hero ? <HeroCard a={hero} saved={saved} onSave={toggle} /> : <EmptyState />}
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {filtered.slice(1, 5).map((a) => (
                <ArticleCard key={a.id} a={a} saved={saved} onSave={toggle} />
              ))}
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">Just In</h2>
              <Link to="/trending-fakes/resources" className="text-medievalBrown hover:underline text-sm">Resources →</Link>
            </div>
            <div className="bg-white/80 rounded-xl border border-stone-200 divide-y">
              {justIn.length ? justIn.map((a) => <JustIn key={a.id} a={a} />) : <div className="p-4 text-stone-500">No items</div>}
            </div>
            <div className="mt-6">
              <Link to="/trending-fakes/guide" className="block px-4 py-3 rounded-xl bg-medievalGold text-black font-semibold hover:bg-medievalBrown hover:text-white transition text-center">
                Spot the Fakes: Quick Guide
              </Link>
            </div>
          </aside>
        </div>

        {/* Even more below */}
        {more.length > 0 && (
          <>
            <h3 className="mt-10 text-2xl font-serif text-medievalRed">More Stories</h3>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {more.map((a) => <ArticleCard key={a.id} a={a} saved={saved} onSave={toggle} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Badge({ status }) {
  const map = {
    Debunked: "bg-red-600",
    "Likely Fake": "bg-orange-500",
    Misleading: "bg-amber-600",
    Unverified: "bg-stone-500",
  };
  return (
    <span className={`px-2 py-1 text-xs rounded-full text-white ${map[status] || "bg-stone-600"}`}>
      {status}
    </span>
  );
}

function SaveButton({ saved, id, onSave }) {
  const on = saved.has(id);
  return (
    <button
      onClick={() => onSave(id)}
      className={`px-2.5 py-1.5 rounded-lg border text-sm transition ${on ? "bg-stone-800 text-white border-stone-800" : "bg-white/80 border-stone-300 hover:bg-stone-100"}`}
      title={on ? "Saved" : "Save for later"}
    >
      {on ? "✓ Saved" : "☆ Save"}
    </button>
  );
}

function HeroCard({ a, saved, onSave }) {
  return (
    <article className="bg-white/90 rounded-2xl overflow-hidden border border-stone-200 shadow">
      <Link to={`/trending-fakes/a/${a.id}`}>
        <img src={a.image} alt={a.title} className="w-full h-64 object-cover" />
      </Link>
      <div className="p-5 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm">
          <Badge status={a.status} />
          <span className="px-2 py-0.5 rounded bg-stone-200">{a.type}</span>
          <span className="text-stone-500">• {new Date(a.publishedAt).toLocaleString()}</span>
        </div>
        <Link to={`/trending-fakes/a/${a.id}`} className="text-2xl font-bold hover:underline">
          {a.title}
        </Link>
        <p className="text-stone-700">{a.summary}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-stone-500 text-sm">Category: {a.category}</span>
          <SaveButton saved={saved} id={a.id} onSave={onSave} />
        </div>
      </div>
    </article>
  );
}

function ArticleCard({ a, saved, onSave }) {
  return (
    <article className="bg-white/90 rounded-xl border border-stone-200 overflow-hidden flex flex-col">
      <Link to={`/trending-fakes/a/${a.id}`}>
        <img src={a.image} alt={a.title} className="w-full h-40 object-cover" />
      </Link>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs">
          <Badge status={a.status} />
          <span className="px-1.5 py-0.5 rounded bg-stone-200">{a.type}</span>
          <span className="text-stone-500">• {new Date(a.publishedAt).toLocaleDateString()}</span>
        </div>
        <Link to={`/trending-fakes/a/${a.id}`} className="font-semibold hover:underline">
          {a.title}
        </Link>
        <p className="text-sm text-stone-700 line-clamp-3">{a.summary}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-stone-500 text-xs">{a.category}</span>
          <SaveButton saved={saved} id={a.id} onSave={onSave} />
        </div>
      </div>
    </article>
  );
}

function JustIn({ a }) {
  return (
    <Link to={`/trending-fakes/a/${a.id}`} className="flex gap-3 p-3 hover:bg-stone-100 transition">
      <img src={a.image} alt="" className="w-24 h-16 rounded object-cover border border-stone-200" />
      <div className="flex-1">
        <div className="flex items-center gap-2 text-[11px] mb-1">
          <Badge status={a.status} />
          <span className="px-1 py-0.5 rounded bg-stone-200">{a.type}</span>
          <span className="text-stone-500">• {new Date(a.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="text-sm font-medium leading-snug line-clamp-2">{a.title}</div>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="p-6 rounded-xl border border-dashed text-stone-500">
      No matching stories. Try clearing filters.
    </div>
  );
}
