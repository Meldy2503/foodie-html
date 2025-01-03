/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Include the root index.html
    "./pages/**/*.html", // Include all .html files inside the pages folder
    "./js/**/*.js", // Include all .js files inside the js folder
    "./components/**/*.html", // Include any .html files in components folder
  ],
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
