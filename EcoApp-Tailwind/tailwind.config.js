/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'yellow-glow': '0 0 10px rgba(255, 255, 0, 0.6)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};