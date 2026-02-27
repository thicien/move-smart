/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1E3A8A',     // Background / Main Brand
          orange: '#F97316',   // Primary Buttons
          light: '#F3F4F6',    // Secondary Panels
          dark: '#111827',     // Text
          red: '#DC2626',      // Alerts - Danger
          yellow: '#FBBF24',   // Alerts - Warning
        }
      }
    },
  },
  plugins: [],
}
