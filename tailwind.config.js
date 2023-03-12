/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{ejs,js}", "./views/partials/**/*.ejs"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        lightGray: "#FDFDFD",
        darkGray: "#F1F8FF",
        brightBlue: "#0085FE",
        darkBlue: "#030346",
        lightPink: "#FEB7FE",
        lightGreen: "#4CAF50",
        darkerBlue: "#7F8487",
      },
    },
  },
  plugins: [],
};
