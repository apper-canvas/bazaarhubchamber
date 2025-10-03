/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF9900",
        secondary: "#232F3E",
        accent: "#37475A",
        success: "#067D62",
        warning: "#F59E0B",
        danger: "#DC2626",
        info: "#2563EB",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};