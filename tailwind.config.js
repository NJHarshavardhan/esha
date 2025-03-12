/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FDF2F8', // Light pink
          DEFAULT: '#FBA1A1', // Medium pink
          dark: '#FF6B6B', // Dark pink
        },
        secondary: {
          light: '#FFF5F5',
          DEFAULT: '#FFE3E3',
          dark: '#FF8787',
        },
        pink: {
          50: '#FFF5F7',
          100: '#FFEBEF',
          200: '#FED7E2',
          300: '#FBB6CE',
          400: '#F687B3',
          500: '#ED64A6',
          600: '#D53F8C',
          700: '#B83280',
          800: '#97266D',
          900: '#702459',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'butterfly': 'butterfly 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.1)' },
        },
        butterfly: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -10px) rotate(10deg)' },
          '50%': { transform: 'translate(20px, 0) rotate(0deg)' },
          '75%': { transform: 'translate(10px, 10px) rotate(-10deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
};