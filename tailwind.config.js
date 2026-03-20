/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          500: '#14b8a6',
          700: '#0f766e',
          950: '#042f2e',
        },
        ink: {
          900: '#0f172a',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 18px 40px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
