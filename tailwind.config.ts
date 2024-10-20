import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderColor: {
        main: "#ebebeb",
        hover: "#c9c9c9",
        "dark-main": "#3c3c3c",
        "dark-hover": "#4c4c4c",
      },
      fontFamily: {
        geistSans: ["var(--font-geist-sans)", "monospace"],
        geistMono: ["var(--font-geist-mono)", "monospace"],
      },
      textColor: {
        main: "#000000",
        secondary: "#797979",
        hover: "",
        "dark-main": "#eeeeee",
        "dark-secondary": "#4c4c4c",
        "dark-hover": "",
      },
      backgroundColor: {
        secondary: "#faf8f6",
        hover: "#eeeeee",
        dark: "#0f0f0f",
        "dark-secondary": "#000000",
        "dark-hover": "#212121",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
