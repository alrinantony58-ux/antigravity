/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#050408',
          900: '#080808',
          850: '#0c0a14',
          800: '#12101e',
          700: '#1a172a',
        },
        purple: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#8b5cf6',
          700: '#7c3aed',
          900: '#3b0764',
          950: '#1e053a',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px rgba(139, 92, 246, 0.35)',
        'glow-purple-lg': '0 0 45px rgba(139, 92, 246, 0.5)',
      }
    },
  },
  plugins: [],
}

