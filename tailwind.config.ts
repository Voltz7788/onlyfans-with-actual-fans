import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "onlyfans-black": "#242529",
        "onlyfans-light-gray": "#8A96A3",
        "onlyfans-blue": "#0091ea",
        "onlyfans-light-blue": "#00aff0",
      },
    },
    screens: {
      xs: "425px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
export default config;
