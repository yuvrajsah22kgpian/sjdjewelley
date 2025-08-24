/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        fontFamily: {
          'playfair': ['Playfair Display', 'serif'],
        },
      },
    },
    plugins: [],
  };
  