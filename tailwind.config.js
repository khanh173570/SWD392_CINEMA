/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cinestar-purple": "#5D25A8",
        "cinestar-dark": "#0f172a",
        "cinestar-red": "#FF3366",
      },
    },
  },
  plugins: [],
};
