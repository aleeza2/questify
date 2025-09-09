// src/pages/Leaderboard.jsx
export default function Leaderboard() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-5xl font-serif text-medievalGold mb-6">🏆 Leaderboard</h1>
        <p className="text-lg text-medievalBrown mb-8">
          See which adventurers have uncovered the most fake scrolls.
        </p>
        <ul className="space-y-4">
          <li className="bg-white/80 p-4 rounded-lg shadow w-80 border-2 border-medievalBrown">
            🥇 Adventurer A — 120 points
          </li>
          <li className="bg-white/80 p-4 rounded-lg shadow w-80 border-2 border-medievalBrown">
            🥈 Adventurer B — 95 points
          </li>
          <li className="bg-white/80 p-4 rounded-lg shadow w-80 border-2 border-medievalBrown">
            🥉 Adventurer C — 78 points
          </li>
        </ul>
      </div>
    );
  }
  