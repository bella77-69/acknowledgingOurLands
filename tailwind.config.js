/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Updated to common dark mode handling
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
        customWhite: '#FFFCF7', // Light mode text color
        customNav: '#446464',   // Light mode navbar color
        customNavDark: '#a2b2b2', // dark mode text color
        textWhite: '#e6e3de',
        active: '#223232',
        hover: '#698383',
        customBlack: '#1A1A1A', // Light mode background color
        darkBackground: '#0D1117', // New: Background color for dark mode
        darkNav: '#1E2A31', // New: Navbar color for dark mode
        darkText: '#EDEDED', // New: Text color for dark mode
        cardLight: '#a2b2b2'
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};
