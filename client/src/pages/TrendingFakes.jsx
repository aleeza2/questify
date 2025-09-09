// src/pages/TrendingFakes.jsx
export default function TrendingFakes() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-5xl font-serif text-medievalBrown mb-6">🔥 Trending Fakes</h1>
        <p className="text-lg text-medievalBrown mb-8">
          Beware! These are the latest fake scrolls spreading across the realm.
        </p>
        <div className="space-y-4 w-full max-w-xl">
          <div className="bg-white/80 p-4 rounded-lg shadow border-2 border-medievalRed">
            ❌ “Scientists confirm dragons are real” — Spotted 2,300 times
          </div>
          <div className="bg-white/80 p-4 rounded-lg shadow border-2 border-medievalRed">
            ❌ “King Arthur returns in 2025” — Spotted 1,800 times
          </div>
          <div className="bg-white/80 p-4 rounded-lg shadow border-2 border-medievalRed">
            ❌ “Potion guarantees immortality” — Spotted 950 times
          </div>
        </div>
      </div>
    );
  }
  