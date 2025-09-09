// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar"; 
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import Home from "./pages/home";
import Leaderboard from "./pages/Leaderboard";
import FakeOrNot from "./pages/FakeOrNot";
import TrendingFakes from "./pages/TrendingFakes";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/verify"
            element={
              <RequireAuth>
                <Verify />
              </RequireAuth>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <RequireAuth>
                <Leaderboard />
              </RequireAuth>
            }
          />
          <Route
            path="/fake-or-not"
            element={
              <RequireAuth>
                <FakeOrNot />
              </RequireAuth>
            }
          />
          <Route
            path="/trending-fakes"
            element={
              <RequireAuth>
                <TrendingFakes />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
