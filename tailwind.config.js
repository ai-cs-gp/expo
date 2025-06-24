/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['cairo'],
        'cairo-reg': ['cairo-reg'],
        'cairo-bold': ['cairo-bold'],
        sans: ['Inter', 'sans-serif'],
        gotham: ['Gotham', 'sans-serif'],
        gothamBold: ['GothamBold', 'Gotham', 'sans-serif'],
      },
      colors: {
        background: '#fff',
        text: '#000000',
        primary: '#000000',
        'primary-dark': '#000000',
      },
    },
  },
  plugins: [],
};
