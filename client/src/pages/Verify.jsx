// src/pages/Verify.jsx
import { useState } from "react";
import { getUsername, isLoggedIn } from "../utils/auth";
import { addPoints, hasBeenAwarded, markAwarded } from "../utils/points";

export default function Verify() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    if (!url.trim()) {
      setResult({ status: "invalid", message: "Scroll is empty 🧾" });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      
      if (data.status === "fake" && isLoggedIn()) {
        const user = getUsername();
        if (!hasBeenAwarded(user, url)) {
          const gained = 50; 
          const total = addPoints(user, gained);
          markAwarded(user, url);
          setResult({ ...data, gained, total });
        } else {
          setResult({
            ...data,
            gained: 0,
            total: null,
            repeat: true,
            message: "🧙‍♂️ You already earned XP for this exact scroll.",
          });
        }
      } else {
        setResult(data);
      }
    } catch (err) {
      setResult({ status: "error", message: "⚠️ The oracle could not read this scroll" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-4xl font-serif text-medievalBrown mb-6">
        🪶 Submit a Link for Truth
      </h1>

      <input
        type="text"
        placeholder="Paste your scroll here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full max-w-lg px-4 py-2 border-2 border-medievalBrown rounded mb-4"
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="px-6 py-3 bg-medievalRed text-white font-bold rounded-lg hover:bg-medievalBrown transition disabled:opacity-50"
      >
        {loading ? "🔮 Analysing..." : "⚔ Verify"}
      </button>

      {loading && (
        <div className="mt-6 text-lg animate-pulse">✨ The oracle is consulting the scrolls...</div>
      )}

      {result && (
        <div className="mt-6 p-4 border rounded bg-white shadow text-lg max-w-lg text-left">
          {result.status === "fake" && (
            <>
              <p>🎉 Congrats, adventurer! You spotted a fake.</p>
              {"gained" in result && result.gained > 0 && (
                <p className="mt-2">⚡ +{result.gained} XP awarded! {result.total != null && <>Total: <b>{result.total} XP</b></>}</p>
              )}
              {result.repeat && <p className="mt-2">{result.message}</p>}
              {result.reason && <p className="mt-2 text-sm text-gray-700"><b>Reason:</b> {result.reason}</p>}
            </>
          )}

          {result.status === "real" && (
            <>
              <p>😅 Haha! That one’s legit. No XP, but nice try.</p>
              {result.reason && <p className="mt-2 text-sm text-gray-700"><b>Reason:</b> {result.reason}</p>}
            </>
          )}

          {result.status === "invalid" && <p>❌ Invalid scroll: {result.message}</p>}
          {result.status === "error" && <p>⚠️ {result.message}</p>}
        </div>
      )}
    </div>
  );
}
