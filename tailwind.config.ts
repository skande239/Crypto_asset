import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brutal: {
          black: "#000000",
          white: "#FFFFFF",
          gray: "#8E9196",
          accent: "#8B5CF6",
        },
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px #000000",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;