/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001426",
        secondary: "#EFFF35",
        third: "#CCCCCC",
        opaqueBlack: "#0000004",
        opaqueWhite: "#FFFFFF1F",
        lightGray: "#727272",
        loading: "#A7A7A7",
        success: "#39EC8B",
        error: "#EE0000",
      },
    },
  },
  plugins: [],
};
