/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0b",
        card: "rgba(255,255,255,.05)",
        line: "rgba(255,255,255,.12)",
        text: "#ffffff",
        mute: "rgba(255,255,255,.70)",
        primary: "#39FF14",       // Neon green
        accent: "#67e8f9",        // Cyan
      },
      fontFamily: {
        display: ['"Archivo Black"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(57,255,20,.15)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};
