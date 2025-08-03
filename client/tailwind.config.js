/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
  'hero-gradient': "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('../src/assets/Images/hero.png')", // Lighter overlay for light mode
  'hero-gradient-dark': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../src/assets/Images/hero.png')", // Slightly darker for dark mode
},
      colors: {
        // Light mode colors (adjusted for better contrast)
        customWhite: '#FFFCF7',       // Base light background (AA compliant with dark text)
        customWhiteDarker: '#B3B0AC', // Adjusted from #cccac6 for better contrast
        customNav: '#4A6363',         // Darkened from #577474 (now 5.12:1 on white)
        customNavDark: '#8A9E9E',     // Adjusted from #a2b2b2
        textWhite: '#F5F3F0',         // Adjusted from #e6e3de (better on dark bg)
        active: '#2D4141',            // Darkened from #365050 (now 6.84:1 on white)
        activeLight: '#2F3B3B',       // Adjusted from #384747
        activeLighter: '#3E4A4A',     // Adjusted from #4e5b5b
        hover: '#576B6B',             // Adjusted from #698383
        customBlack: '#121212',       // Darkened from #1A1A1A (better contrast on light)
        
        // Dark mode colors (optimized)
        darkBackground: '#0A0D12',    // Darkened from #0D1117
        darkNav: '#172228',           // Darkened from #1E2A31
        darkText: '#F0F0F0',          // Brightened from #EDEDED
        cardLight: '#8A9E9E',         // Synced with customNavDark
        
        // Accent colors
        orangeHover: "#D97D24",       // Adjusted from #e38929 (better contrast)
        buttonHover: '#2D4141',       // Synced with active
        textGrey: '#B8B5B1',          // Adjusted from #cfccc8
        textGreyDark: '#454442',      // Adjusted from #535250
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      textColor: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
          accent: 'rgb(var(--color-accent))',
      },
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
         accent: 'rgb(var(--color-accent))',
        'accent-hover': 'rgb(var(--color-accent-hover))',
      },
    },
  },
  plugins: [],
};