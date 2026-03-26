/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgStart: '#090a0f',
        bgEnd: '#161925',
        surface: 'rgba(22, 25, 37, 0.65)',
        surfaceBorder: 'rgba(255, 255, 255, 0.08)',
        surfaceHover: 'rgba(255, 255, 255, 0.12)',
        brandPrimary: '#8b5cf6',
        brandSecondary: '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
