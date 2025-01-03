/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        hermione: ['"Hermione"', "sans-serif"],
        proximaBold: ['"Proxima-bold"', "sans-serif"],
        proximaSemibold: ['"Proxima-semibold"', "sans-serif"],
        proximaRegular: ['"Proxima-regular"', "sans-serif"],
      },
      colors: {
        primary: "#e01b3c",
        lightPrimary: "#faeded",
        secondary: "#edf2fa",
        lightSecondary: "#f8fbff",
        tetiary: "#fafafa",
        lightTetiary: "#f2f2f2",
        dark: "#201a21",
      },
    },
  },
  plugins: [],
};
