/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        signature: ["'Dancing Script'", "cursive"],
        body: ["'Inter'", "sans-serif"],
      },
      colors: {
        space: {
          900: '#04030a',
          800: '#0b0920',
          700: '#110d35',
          600: '#1a1250',
        },
        gold: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#f59e0b',
        },
        purple: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
        },
        rose: {
          400: '#fb7185',
        },
      },
    },
  },
  plugins: [],
}
