import React from "react";

// Social icon SVGs (inline, no external deps)
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function WebIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const typeColors = {
  pm: { label: "Prediction Market", color: "text-cyber-purple border-cyber-purple/40 bg-purple-900/20" },
  agent: { label: "AI Agent", color: "text-cyber-cyan border-cyan-500/40 bg-cyan-900/20" },
  pm_builder: { label: "PM Builder", color: "text-pink-400 border-pink-500/40 bg-pink-900/20" },
  ai_builder: { label: "AI Builder", color: "text-emerald-400 border-emerald-500/40 bg-emerald-900/20" },
};

export default function EntryCard({ entry }) {
  const tag = typeColors[entry.type] || typeColors.pm;

  const ensureHttp = (url) => {
    if (!url) return "#";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="cyber-card rounded-lg p-5 flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="shrink-0 w-12 h-12 rounded-lg bg-cyber-border flex items-center justify-center overflow-hidden border border-cyber-border">
          {entry.logo ? (
            <img
              src={entry.logo}
              alt={entry.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <span
            className="text-cyber-purple font-mono font-bold text-lg"
            style={{ display: entry.logo ? "none" : "flex" }}
          >
            {entry.name?.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Name + tag */}
        <div className="flex-1 min-w-0">
          <a
            href={ensureHttp(entry.website)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white hover:text-cyber-purple transition-colors text-base leading-tight block truncate"
          >
            {entry.name}
          </a>
          <span
            className={`inline-block mt-1 text-xs font-mono px-2 py-0.5 rounded border ${tag.color}`}
          >
            {tag.label}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
        {entry.description}
      </p>

      {/* Social links */}
      <div className="flex items-center gap-3 pt-1 border-t border-cyber-border">
        <a
          href={ensureHttp(entry.website)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-cyber-cyan transition-colors"
          title="Website"
        >
          <WebIcon />
        </a>
        {entry.xProfile && (
          <a
            href={ensureHttp(entry.xProfile)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
            title="X / Twitter"
          >
            <XIcon />
          </a>
        )}
        {entry.linkedin && (
          <a
            href={ensureHttp(entry.linkedin)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-blue-400 transition-colors"
            title="LinkedIn"
          >
            <LinkedInIcon />
          </a>
        )}
        {entry.telegram && (
          <a
            href={ensureHttp(entry.telegram)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-sky-400 transition-colors"
            title="Telegram"
          >
            <TelegramIcon />
          </a>
        )}
      </div>
    </div>
  );
}
