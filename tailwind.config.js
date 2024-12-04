/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-mode="dark"]'], // Updated to common dark mode handling
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
     
      backgroundImage: {
        'hero-gradient':
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../src/assets/Images/hero.png')",
      },
      colors: {
        customWhite: '#FFFCF7',
        customNav: '#446464',
        active: '#223232',
        hover: '#698383',
        customBlack: '#1A1A1A',
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};
