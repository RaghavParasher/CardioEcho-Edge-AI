/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cardio: {
          dark: '#050a14',
          card: 'rgba(10, 20, 38, 0.75)',
          border: 'rgba(56, 189, 248, 0.15)',
          emerald: '#10b981',
          cyan: '#06b6d4',
          sky: '#38bdf8',
          red: '#f43f5e',
          amber: '#f59e0b',
          purple: '#8b5cf6',
          glow: '#38bdf8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-cardio': '0 0 20px -3px rgba(56, 189, 248, 0.25)',
        'neon-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.25)',
        'neon-red': '0 0 20px -3px rgba(244, 63, 94, 0.3)',
      }
    },
  },
  plugins: [],
}
