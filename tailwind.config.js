/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mulish", "sans-serif"],
      },
      colors: {
        black: "#000000",
        orange: {
          DEFAULT: "#F97316",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
        },
      },
    },
  },
  plugins: [],
};
