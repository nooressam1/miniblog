/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        rotateShake: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-15deg)" },
          "75%": { transform: "rotate(15deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "rotate-shake": "rotateShake 0.5s ease-in-out",
      },
      colors: {
        primary: "#171C36",
        primarylighter: "#20284E",
        secondary: "#2A3882",
        secondarylighter: "#354497",
        background: "#0C0A1F", // fixed
        lightBlue: "#7E96F6",
      },
    },
  },
  plugins: [],
};
