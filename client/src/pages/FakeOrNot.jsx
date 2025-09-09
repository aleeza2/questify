// src/pages/FakeOrNot.jsx
export default function FakeOrNot() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-5xl font-serif text-medievalRed mb-6">🤔 Fake or Not?</h1>
        <p className="text-lg text-medievalBrown mb-8">
          Challenge your friends to spot the real from the fake scrolls.
        </p>
        <button className="px-6 py-3 bg-medievalGold rounded-lg text-black font-bold hover:bg-medievalBrown hover:text-white transition">
          Start a Game
        </button>
      </div>
    );
  }
  