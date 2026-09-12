/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#faf8f5",
          soft: "#f8fafc",
        },
        pastel: {
          pink: "#ffd6e8",
          "pink-deep": "#ff9ec7",
          blue: "#d6ecff",
          "blue-deep": "#8fc5ff",
          mint: "#d3f8e2",
          "mint-deep": "#7fe0ab",
          lavender: "#e6ddff",
          "lavender-deep": "#b8a4ff",
          yellow: "#fff3c4",
          "yellow-deep": "#ffd966",
        },
        ink: {
          DEFAULT: "#2f2b3a",
          soft: "#6b6478",
          faint: "#a39cb0",
        },
      },
      fontFamily: {
        display: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Plus Jakarta Sans", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgba(150, 130, 180, 0.15)",
        card: "0 6px 24px -8px rgba(120, 100, 160, 0.18)",
        "card-hover": "0 12px 32px -8px rgba(120, 100, 160, 0.28)",
        pill: "0 2px 8px -2px rgba(150, 130, 180, 0.2)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pop: {
          "0%": { transform: "scale(0.96)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
        pop: "pop 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
