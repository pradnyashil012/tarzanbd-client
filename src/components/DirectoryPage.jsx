import React, { useEffect, useState } from "react";
import EntryCard from "./EntryCard";

const API_BASE = process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, "") || "";
const API_ENTRIES = `${API_BASE}/api/entries`;

export default function DirectoryPage({ type, title, subtitle, accentColor }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_ENTRIES}?type=${type}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [type]);

  const filtered = entries.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase())
  );

  const accentMap = {
    purple: "text-cyber-purple glow-purple",
    cyan: "text-cyber-cyan glow-cyan",
    pink: "text-pink-400",
    emerald: "text-emerald-400",
  };
  const accentClass = accentMap[accentColor] || accentMap.purple;

  const borderMap = {
    purple: "border-cyber-purple/30 focus:border-cyber-purple",
    cyan: "border-cyan-500/30 focus:border-cyber-cyan",
    pink: "border-pink-500/30 focus:border-pink-400",
    emerald: "border-emerald-500/30 focus:border-emerald-400",
  };
  const borderClass = borderMap[accentColor] || borderMap.purple;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="mb-10 relative">
        <div className="absolute inset-0 scanlines rounded-xl pointer-events-none" />
        <p className="font-mono text-xs text-slate-500 mb-2 tracking-widest uppercase">
          // PMx Directory
        </p>
        <h1 className={`text-4xl sm:text-5xl font-bold mb-3 ${accentClass}`}>
          {title}
        </h1>
        <p className="text-slate-400 max-w-xl text-sm leading-relaxed">{subtitle}</p>
      </div>

      {/* Search + count */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-8">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`bg-cyber-card border rounded px-4 py-2 text-sm text-white placeholder-slate-600 outline-none transition-colors w-full sm:w-72 ${borderClass}`}
        />
        {!loading && (
          <span className="text-slate-500 text-xs font-mono">
            {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
          </span>
        )}
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center gap-3 text-slate-400 py-20 justify-center">
          <div className="w-5 h-5 border-2 border-cyber-purple border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm">Loading...</span>
        </div>
      )}

      {error && (
        <div className="border border-red-800 bg-red-900/20 rounded p-4 text-red-400 font-mono text-sm">
          Error: {error} — Is the backend running?
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-600 font-mono text-sm">
            {search ? "No matches found." : "No entries yet. Add the first one →"}
          </p>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
