/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        Fredoka: "Fredoka",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        primaryBlue: "#0cc0df",
        primaryGray: "#737373",
        primaryWhite: "#fffffe",
      },
    },
  },
  plugins: [],
};
