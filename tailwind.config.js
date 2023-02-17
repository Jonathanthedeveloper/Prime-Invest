/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{ejs,js}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        lightGray: "#DCDCDC",
        gold: "#D4AF37",
        orangeRed: "#FF4500",
        darkWhite: "#F2F4FB",
        veryDarkWhite: "#DDDDDD",
        paleGreen: "#84D2C5",
        darkerWhite: "#ECECEC",
        inkBlue: "#31286e",
        darkNavy: "#0f2331",
      },
    },
  },
  plugins: [],
};
