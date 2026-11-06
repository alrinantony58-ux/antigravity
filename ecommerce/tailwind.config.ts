import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          50: '#f0f6ff',
          100: '#e0edfe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#38a7f7',
          500: '#0e89e9',
          600: '#026fc7',
          700: '#0358a1',
          800: '#074c84',
          900: '#0c3f6e',
          950: '#082849',
          brand: '#1d4ed8', // Core signature royal blue
          accent: '#2563eb', // Vibrant royal blue
          dark: '#0f172a', // Midnight slate
          deep: '#1e3a8a', // Deep royal navy
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'royal-sm': '0 2px 8px -1px rgba(29, 78, 216, 0.08), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        'royal-md': '0 8px 24px -4px rgba(29, 78, 216, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.04)',
        'royal-lg': '0 16px 36px -6px rgba(29, 78, 216, 0.18), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'slide-in-right': 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;

