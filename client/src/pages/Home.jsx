// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { isLoggedIn, getUsername } from "../utils/auth";

export default function Home() {
  const username = getUsername();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/quest-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 text-white">
        <h1 className="text-6xl font-serif text-medievalGold mb-6 drop-shadow-lg">
          ⚔️ Questify
        </h1>

        {isLoggedIn() ? (
          <>
            <p className="text-xl mb-8">
              Welcome back, <span className="font-bold">{username}</span>!  
              Your quest awaits. 🔮
            </p>
            <div className="flex space-x-4">
              <Link
                to="/verify"
                className="px-6 py-3 bg-medievalGold rounded-lg text-black font-bold hover:bg-medievalBrown hover:text-white transition"
              >
                🔍 Verify a Link
              </Link>
              <Link
                to="/scrolls"
                className="px-6 py-3 bg-medievalRed rounded-lg text-white font-bold hover:bg-medievalBrown transition"
              >
                📜 Scrolls of Truth
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-xl mb-8">
              Welcome, Adventurer! 🧙‍♂️  
              Sign in to begin your quest for truth.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/signin"
                className="px-6 py-3 bg-medievalRed rounded-lg text-white font-bold hover:bg-medievalBrown transition"
              >
                🔑 Sign In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 bg-medievalGold rounded-lg text-black font-bold hover:bg-medievalBrown hover:text-white transition"
              >
                ✨ Sign Up
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
