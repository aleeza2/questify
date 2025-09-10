// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import BackgroundAudio from "./components/BackgroundAudio";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import Home from "./pages/home";
import Leaderboard from "./pages/Leaderboard";
import FakeOrNot from "./pages/FakeOrNot";
import FakeOrNotPlay from "./pages/FakeOrNotPlay";
import TrendingFakes from "./pages/TrendingFakes";
import TrendingArticle from "./pages/TrendingArticle";
import TrendingGuide from "./pages/TrendingGuide";
import TrendingResources from "./pages/TrendingResources";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <BackgroundAudio />  {/* subtle looping music */}
      <Navbar />

      <div className="flex-grow">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected */}
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/verify" element={<RequireAuth><Verify /></RequireAuth>} />
          <Route path="/leaderboard" element={<RequireAuth><Leaderboard /></RequireAuth>} />
          <Route path="/fake-or-not" element={<RequireAuth><FakeOrNot /></RequireAuth>} />
          <Route path="/fake-or-not/play" element={<RequireAuth><FakeOrNotPlay /></RequireAuth>} />
          <Route path="/trending-fakes" element={<RequireAuth><TrendingFakes /></RequireAuth>} />
          <Route path="/trending-fakes/a/:id" element={<RequireAuth><TrendingArticle /></RequireAuth>} />
          <Route path="/trending-fakes/guide" element={<RequireAuth><TrendingGuide /></RequireAuth>} />
          <Route path="/trending-fakes/resources" element={<RequireAuth><TrendingResources /></RequireAuth>} />
        </Routes>
      </div>
    </div>
  );
}
