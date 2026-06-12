/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        text: "var(--text-primary)",
        accent: {
          lime: "var(--accent-lime)",
          orange: "var(--accent-orange)",
          mint: "var(--accent-mint)",
          white: "var(--accent-white)",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "Courier New", "Courier", "monospace"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
      backgroundImage: {
        'grid-pattern': "var(--grid-pattern)",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
