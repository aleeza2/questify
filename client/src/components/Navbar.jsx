// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout, getUsername } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const username = getUsername();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="bg-medievalBrown text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold flex items-center">
        ⚔ Questify
      </Link>

      {/* Links */}
      <div className="space-x-6">
        {!loggedIn ? (
          <>
            <Link to="/signin" className="hover:underline">Sign In</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/home" className="hover:underline">Home</Link>
            <Link to="/verify" className="hover:underline">Verify</Link>
            <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
            <Link to="/fake-or-not" className="hover:underline">Fake or Not</Link>
            <Link to="/trending-fakes" className="hover:underline">Trending Fakes</Link>
            <button
              onClick={handleLogout}
              className="bg-red-700 px-3 py-1 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
