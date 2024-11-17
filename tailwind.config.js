/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#1A1A1D",
        },
        gold: {
          100: "#FFAD60",
          200: "#A66E38",
        },
        prim: {
          100: "#A0153E",
          200: "#FFF4B7",
          300: "#006A67",
        },
      },
      boxShadow: {
        "orange-shadow": "0px 0px 10px #FFAD60",
      },
      keyframes: {
        slideHorizontal: {
          "0%": { left: "0%", opacity: "1" },
          "75%": { opacity: "0.2" },
          "100%": { left: "100%", opacity: "0" },
        },
      },

      animation: {
        slideHorizontal: "slideHorizontal 2.5s linear infinite",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
