/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-700": "#232322",
        "gray-800": "#111010",
        "gray-900": "#0c0c0d",
      },
    },
  },
  plugins: [],
};
