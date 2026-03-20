import React, { useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, "") || "";
const API_ENTRIES = `${API_BASE}/api/entries`;

const TYPES = [
  { value: "pm", label: "Prediction Market" },
  { value: "agent", label: "AI Agent" },
  { value: "pm_builder", label: "PM Builder" },
  { value: "ai_builder", label: "AI Builder" },
];

const EMPTY_FORM = {
  name: "",
  website: "",
  logo: "",
  xProfile: "",
  linkedin: "",
  telegram: "",
  description: "",
  type: "pm",
};

export default function Admin() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState("");
  const [preview, setPreview] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.website || !form.description) {
      setStatus("error");
      setErrorMsg("Name, website, and description are required.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(API_ENTRIES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          data = null;
        }
        throw new Error(data?.error || text || `Server error (${res.status})`);
      }
      setStatus("success");
      setForm(EMPTY_FORM);
      setPreview(false);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  const inputClass =
    "w-full bg-cyber-card border border-cyber-border rounded px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-cyber-purple transition-colors";

  const labelClass = "block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-xs text-slate-500 mb-2 tracking-widest uppercase">
          // Admin
        </p>
        <h1 className="text-4xl font-bold text-cyber-purple glow-purple mb-2">
          Add Entry
        </h1>
        <p className="text-slate-400 text-sm">
          Fill in the details below. The entry will appear on the relevant directory page instantly.
        </p>
      </div>

      {/* Success banner */}
      {status === "success" && (
        <div className="mb-6 border border-emerald-500/40 bg-emerald-900/20 rounded p-4 flex items-center gap-3">
          <span className="text-emerald-400 text-lg">✓</span>
          <div>
            <p className="text-emerald-400 font-mono text-sm font-bold">Entry added successfully!</p>
            <p className="text-slate-400 text-xs mt-0.5">It's now live on the directory.</p>
          </div>
        </div>
      )}

      {/* Error banner */}
      {status === "error" && (
        <div className="mb-6 border border-red-500/40 bg-red-900/20 rounded p-4">
          <p className="text-red-400 font-mono text-sm">{errorMsg}</p>
        </div>
      )}

      <div className="cyber-card rounded-xl p-6 flex flex-col gap-5">
        {/* Type */}
        <div>
          <label className={labelClass}>Type *</label>
          <div className="grid grid-cols-2 gap-2">
            {TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setForm({ ...form, type: t.value })}
                className={`py-2.5 px-4 rounded border text-sm font-mono transition-all ${
                  form.type === t.value
                    ? "border-cyber-purple text-cyber-purple bg-purple-900/20"
                    : "border-cyber-border text-slate-500 hover:border-slate-500 hover:text-slate-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className={labelClass}>Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Polymarket"
            className={inputClass}
          />
        </div>

        {/* Website */}
        <div>
          <label className={labelClass}>Website *</label>
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="https://polymarket.com"
            className={inputClass}
          />
        </div>

        {/* Logo URL */}
        <div>
          <label className={labelClass}>Logo URL</label>
          <input
            name="logo"
            value={form.logo}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
            className={inputClass}
          />
          {form.logo && (
            <div className="mt-2 flex items-center gap-3">
              <img
                src={form.logo}
                alt="Logo preview"
                className="w-10 h-10 rounded object-contain border border-cyber-border bg-cyber-bg"
                onError={(e) => (e.target.style.opacity = 0.2)}
              />
              <span className="text-xs text-slate-500 font-mono">preview</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Short Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="One or two sentences describing the project..."
            className={`${inputClass} resize-none`}
          />
          <p className="text-xs text-slate-600 mt-1 font-mono">
            {form.description.length} chars
          </p>
        </div>

        {/* Socials */}
        <div className="border-t border-cyber-border pt-5">
          <p className={`${labelClass} mb-3`}>Social Links (optional)</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-slate-500 font-mono text-xs w-20 shrink-0">X / Twitter</span>
              <input
                name="xProfile"
                value={form.xProfile}
                onChange={handleChange}
                placeholder="https://x.com/username"
                className={inputClass}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-500 font-mono text-xs w-20 shrink-0">LinkedIn</span>
              <input
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className={inputClass}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-500 font-mono text-xs w-20 shrink-0">Telegram</span>
              <input
                name="telegram"
                value={form.telegram}
                onChange={handleChange}
                placeholder="https://t.me/username"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="mt-2 w-full py-3 rounded bg-cyber-purple hover:bg-purple-500 text-white font-mono font-bold text-sm transition-all shadow-cyber-purple disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Submitting..." : "Add to Directory →"}
        </button>
      </div>

      {/* Quick nav hint */}
      <p className="text-center text-slate-600 font-mono text-xs mt-6">
        Entries appear instantly on their directory page.
      </p>
    </div>
  );
}
