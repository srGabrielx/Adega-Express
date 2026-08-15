/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#dc2626",
          redHover: "#b91c1c",
          redLight: "#fee2e2",
          black: "#09090b",
          dark: "#18181b",
          gray: "#52525b",
          grayLight: "#71717a",
          border: "#e4e4e7",
          ice: "#0284c7",
          iceLight: "#e0f2fe",
          iceBorder: "#bae6fd",
          iceVibrant: "#0ea5e9",
          green: "#16a34a",
          greenLight: "#dcfce7",
          wa: "#25d366",
          waHover: "#1ebc59",
        }
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "system-ui", "sans-serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
        card: "0 4px 16px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
        cardHover: "0 12px 28px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.05)",
        redGlow: "0 6px 20px rgba(220, 38, 38, 0.3)",
        iceGlow: "0 6px 20px rgba(2, 132, 199, 0.25)",
      }
    },
  },
  plugins: [],
}
