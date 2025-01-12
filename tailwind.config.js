/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4747', // AliExpress red
          50: '#FFF2F2',
          100: '#FFE5E5',
          200: '#FFCCCC',
          300: '#FFB3B3',
          400: '#FF9999',
          500: '#FF4747', // Main brand color
          600: '#FF1414',
          700: '#E60000',
          800: '#B30000',
          900: '#800000'
        },
        secondary: {
          DEFAULT: '#FF6B81',
          50: '#FFF5F7',
          100: '#FFE5E9',
          200: '#FFB8C4',
          300: '#FF8A9F',
          400: '#FF5C7A',
          500: '#FF6B81',
          600: '#CC5668',
          700: '#99404E',
          800: '#662B35',
          900: '#33151B'
        }
      },
      boxShadow: {
        'hover': '0 0 10px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};