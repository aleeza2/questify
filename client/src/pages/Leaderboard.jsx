// src/pages/Leaderboard.jsx
import { Link } from "react-router-dom";

const MOCK_LEADERS = [
  { name: "Sir Skeptic", points: 420 },
  { name: "Lady Factchecka", points: 333 },
  { name: "The Scroll Sniffer", points: 287 },
  { name: "Duke Debunk", points: 214 },
  { name: "Baroness Verify", points: 198 },
  { name: "Knight of Sources", points: 172 },
  { name: "Count Credible", points: 165 },
  { name: "Archivist Alice", points: 143 },
  { name: "Monk Markdown", points: 129 },
  { name: "Peasant with Receipts", points: 101 },
];

function medal(idx) {
  if (idx === 0) return "🥇";
  if (idx === 1) return "🥈";
  if (idx === 2) return "🥉";
  return "🏵️";
}

export default function Leaderboard() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-6xl font-serif text-medievalGold mb-3">🏆 Leaderboard</h1>
        <p className="text-medievalBrown mb-10">
          See which adventurers have uncovered the most fake scrolls.
        </p>

        {/* Your score hint (static for mock; link to Verify) */}
        <div className="mb-8 inline-flex items-center gap-3 border-2 border-medievalBrown bg-white/80 px-5 py-3 rounded-xl shadow">
          <span>🧙‍♀️ You:</span>
          <span className="font-bold">0 points</span>
          <Link
            to="/verify"
            className="ml-3 px-3 py-1 rounded-lg bg-medievalGold text-black font-semibold hover:bg-medievalBrown hover:text-white transition"
          >
            + Verify a link
          </Link>
        </div>

        <ul className="space-y-4 text-left">
          {MOCK_LEADERS.map((row, idx) => (
            <li
              key={row.name}
              className="flex items-center justify-between bg-white/90 border-2 border-medievalBrown rounded-xl px-5 py-3 shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{medal(idx)}</span>
                <span className="font-semibold">{row.name}</span>
              </div>
              <span className="font-bold">{row.points} pts</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-medievalBrown/80">
          (Mock data shown. Hook up to your API when ready.)
        </p>
      </div>
    </div>
  );
}
