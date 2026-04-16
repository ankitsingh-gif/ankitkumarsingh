import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-card": "var(--bg-card)",
        fg: "var(--fg)",
        "fg-secondary": "var(--fg-secondary)",
        "fg-muted": "var(--fg-muted)",
        accent: "var(--accent)",
        "accent-light": "var(--accent-light)",
        "accent-bg": "var(--accent-bg)",
        mint: "var(--mint)",
        "mint-light": "var(--mint-light)",
        "mint-bg": "var(--mint-bg)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
