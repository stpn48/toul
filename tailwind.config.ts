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
        main: "#797979",
      },
      fontFamily: {
        geistSans: ["var(--font-geist-sans)", "monospace"],
      },
      textColor: {
        secondary: "#797979",
      },
      backgroundColor: {
        dark: "#131313",
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
