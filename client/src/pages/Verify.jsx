// src/pages/Verify.jsx
import { useState } from "react";

export default function Verify() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      // Fake delay (like it's "analysing")
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Fake oracle logic
      const outcomes = [
        { result: "real", reason: "Trusted by the sages", confidence: "92%" },
        { result: "fake", reason: "Scroll forged by dark forces", confidence: "23%" },
        { result: "error", reason: "The oracle could not read this scroll", confidence: null },
      ];
      const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];

      setResult(randomOutcome);
    } catch (err) {
      setResult({ result: "error", reason: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">🪶 Submit a Link for Truth</h1>

      <input
        type="text"
        placeholder="Paste a link to verify..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full px-4 py-2 border border-gray-400 rounded mb-4"
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="bg-medievalRed hover:bg-medievalBrown text-white px-6 py-2 rounded w-full"
      >
        {loading ? "🔮 Analysing..." : "⚔ Verify"}
      </button>

      {/* Loading screen */}
      {loading && (
        <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 animate-pulse">
          <p className="text-medievalBrown font-semibold">
            The oracle is consulting the scrolls… please wait ⏳
          </p>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="mt-6 p-4 border rounded bg-white shadow text-lg">
          <p>
            <strong>Result:</strong>{" "}
            {result.result === "fake"
              ? "❌ Fake"
              : result.result === "real"
              ? "✅ Real"
              : "⚠️ Error"}
          </p>
          {result.reason && (
            <p>
              <strong>Reason:</strong> {result.reason}
            </p>
          )}
          {result.confidence && (
            <p>
              <strong>Confidence:</strong> {result.confidence}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
