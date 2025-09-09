// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          parchment: '#fdf6e3',
          medievalBrown: '#5e4630',
          medievalRed: '#8b2f2f',
          medievalGold: '#d4af37',
        },
        fontFamily: {
          medieval: ['"IM Fell English SC"', 'serif'], // ✅ generates font-medieval
        },
      },
    },
    plugins: [],
  };
  