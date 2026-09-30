/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        phantom: { black: '#070708', dark: '#101012', card: '#18181b', border: '#27272a', accent: '#7c3aed', accent2: '#a78bfa', red: '#E50914' }
      },
      fontFamily: { display: ['Space Grotesk','Inter','sans-serif'], sans: ['Inter','Helvetica Neue','Arial','sans-serif'] },
    },
  },
  plugins: [],
}
