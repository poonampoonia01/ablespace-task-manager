import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        muted: "#737373",
        line: "#E7E7E7",
        surface: "#F7F7F7"
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.03)"
      }
    }
  },
  plugins: []
};

export default config;
