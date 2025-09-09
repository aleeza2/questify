import { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { TRENDING_FAKES } from "../data/trendingFakes";

function Badge({ status }) {
  const map = { Debunked: "bg-red-600", "Likely Fake": "bg-orange-500", Misleading: "bg-amber-600", Unverified: "bg-stone-500" };
  return <span className={`px-2 py-1 text-xs rounded-full text-white ${map[status] || "bg-stone-600"}`}>{status}</span>;
}

export default function TrendingArticle() {
  const { id } = useParams();
  const a = useMemo(() => TRENDING_FAKES.find((x) => x.id === id), [id]);
  const navigate = useNavigate();

  if (!a) {
    return (
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <p className="mb-4">Story not found.</p>
          <Link className="text-medievalBrown underline" to="/trending-fakes">← Back to Trending</Link>
        </div>
      </div>
    );
  }

  function copyLink() {
    const url = window.location.href;
    navigator.clipboard?.writeText(url);
  }

  return (
    <div className="min-h-screen px-4 md:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="px-3 py-1 rounded bg-stone-200 hover:bg-stone-300 mb-4">← Back</button>

        <img src={a.image} alt="" className="w-full h-72 object-cover rounded-2xl border border-stone-200" />

        <div className="mt-5 flex items-center gap-2 text-sm">
          <Badge status={a.status} />
          <span className="px-2 py-0.5 rounded bg-stone-200">{a.type}</span>
          <span className="text-stone-500">• {new Date(a.publishedAt).toLocaleString()}</span>
        </div>

        <h1 className="mt-2 text-3xl md:text-4xl font-serif text-medievalRed">{a.title}</h1>
        <p className="mt-2 text-stone-700">{a.summary}</p>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <section className="bg-white/90 p-5 rounded-xl border border-stone-200">
            <h2 className="text-xl font-semibold mb-2">Why this is {a.verdict}</h2>
            <ul className="list-disc pl-5 space-y-2 text-stone-800">
              {a.evidence.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </section>

          <section className="bg-white/90 p-5 rounded-xl border border-stone-200">
            <h2 className="text-xl font-semibold mb-2">How to spot it next time</h2>
            <ul className="list-disc pl-5 space-y-2 text-stone-800">
              {a.tips.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </section>
        </div>

        {a.sources?.length > 0 && (
          <section className="mt-6 bg-white/90 p-5 rounded-xl border border-stone-200">
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul className="list-disc pl-5 space-y-1">
              {a.sources.map((s, i) => (
                <li key={i}>
                  <a href={s.url} className="text-medievalBrown underline" target="_blank" rel="noreferrer">{s.name}</a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-6 flex gap-3">
          <button onClick={copyLink} className="px-4 py-2 rounded-lg border border-stone-300 bg-white/90 hover:bg-stone-100">Copy link</button>
          <Link to="/trending-fakes" className="px-4 py-2 rounded-lg bg-medievalGold text-black font-semibold hover:bg-medievalBrown hover:text-white">Back to Trending</Link>
        </div>
      </div>
    </div>
  );
}
