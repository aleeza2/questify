// src/pages/SignUp.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../utils/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password);
    navigate("/verify"); // go straight to verify
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment bg-cover">
      <div className="bg-white/80 shadow-xl rounded-xl p-10 max-w-md w-full border-4 border-medievalBrown">
        {/* Title */}
        <h1 className="text-5xl font-serif text-medievalBrown text-center mb-8">
          ⚔ Join Questify
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
            className="w-full py-3 bg-medievalGold text-black font-bold rounded-lg hover:bg-medievalBrown transition"
          >
            Sign Up
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
          Already have an account?{" "}
          <Link to="/signin" className="underline text-medievalRed">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
