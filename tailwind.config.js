/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#07070f",
          card: "#0e0e1a",
          border: "#1e1e3a",
          purple: "#8b5cf6",
          cyan: "#06b6d4",
          pink: "#ec4899",
          glow: "#a855f7",
        },
      },
      fontFamily: {
        mono: ["'Courier New'", "Courier", "monospace"],
      },
      boxShadow: {
        "cyber-purple": "0 0 15px rgba(139, 92, 246, 0.3)",
        "cyber-cyan": "0 0 15px rgba(6, 182, 212, 0.3)",
        "cyber-card": "0 0 30px rgba(139, 92, 246, 0.1)",
      },
    },
  },
  plugins: [],
};
