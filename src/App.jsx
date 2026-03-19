import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PredictionMarkets from "./pages/PredictionMarkets";
import AIAgents from "./pages/AIAgents";
import PMBuilders from "./pages/PMBuilders";
import AIBuilders from "./pages/AIBuilders";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cyber-bg">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<PredictionMarkets />} />
            <Route path="/ai-agents" element={<AIAgents />} />
            <Route path="/pm-builders" element={<PMBuilders />} />
            <Route path="/ai-builders" element={<AIBuilders />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
