/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    fontFamily: {
      sans: ['DM Sans', 'sans-serif'],
      display: ['Bebas Neue', 'cursive'],
    },
    animation: {
      ticker: 'ticker 30s linear infinite',
      'fade-in': 'fadeIn 0.8s ease forwards',
    },
    keyframes: {
      ticker: {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-50%)' },
      },
      fadeIn: {
        '0%': { opacity: '0', transform: 'translateY(16px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
  },
},
  plugins: [],
}