import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Prediction Markets", path: "/" },
  { label: "AI Agents", path: "/ai-agents" },
  { label: "PM Builders", path: "/pm-builders" },
  { label: "AI Builders", path: "/ai-builders" },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-cyber-border bg-cyber-card sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-xl font-bold text-cyber-purple glow-purple tracking-widest">
              PMx
            </span>
            <span className="text-slate-400 text-sm hidden sm:block font-mono">
              // directory
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded text-sm font-medium transition-all duration-200 font-mono ${
                    active
                      ? "text-cyber-purple bg-purple-900/20 border border-cyber-purple/40"
                      : "text-slate-400 hover:text-cyber-cyan hover:bg-cyan-900/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* <Link
              to="/admin"
              className="ml-4 px-4 py-2 rounded text-sm font-mono font-bold bg-cyber-purple text-white hover:bg-purple-500 transition-all duration-200 shadow-cyber-purple"
            >
              + Add Entry
            </Link> */}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-2 rounded text-sm font-mono transition-all ${
                    active
                      ? "text-cyber-purple bg-purple-900/20"
                      : "text-slate-400 hover:text-cyber-cyan"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-4 py-2 rounded text-sm font-mono font-bold bg-cyber-purple text-white text-center"
            >
              + Add Entry
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
