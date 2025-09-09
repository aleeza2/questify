// src/pages/SignIn.jsx
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "../utils/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home"; // default after login

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password); // save to localStorage
    navigate(from, { replace: true }); // go back to where user came from
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment">
      <div className="bg-white/80 shadow-xl rounded-xl p-10 max-w-md w-full border-4 border-medievalBrown">
        {/* Title */}
        <h1 className="text-5xl font-serif text-medievalBrown text-center mb-8">
          ⚔ Questify
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-medievalBrown rounded-lg focus:outline-none focus:ring-2 focus:ring-medievalGold"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-medievalBrown rounded-lg focus:outline-none focus:ring-2 focus:ring-medievalGold"
          />
          <button
            type="submit"
            className="w-full py-3 bg-medievalRed text-white font-bold rounded-lg hover:bg-medievalBrown transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-medievalBrown"></div>
          <span className="px-2 text-medievalBrown">or</span>
          <div className="flex-grow h-px bg-medievalBrown"></div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-medievalBrown">
          Don’t have an account?{" "}
          <Link to="/signup" className="underline text-medievalRed">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
