/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#4F46E5',
        warn: '#FF0000',
      },
    },
  },
  plugins: [],
};
