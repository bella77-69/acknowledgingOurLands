/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector", '[data-mode="dark"]'],

  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    sm: "480px",
    md: "768px",
    lg: "976px",
    xl: "1440px",
  },
  fontFamily: {
    sans: ["Graphik", "sans-serif"],
    serif: ["Merriweather", "serif"],
  },
  plugins: [],
};
