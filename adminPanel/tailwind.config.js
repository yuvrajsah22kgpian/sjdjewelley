/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBF7',
          100: '#F4E4BC',
          200: '#E8D08C',
          300: '#D4AF37',
          400: '#C19B2A',
          500: '#B8941F',
          600: '#A67E1A',
          700: '#8B6915',
          800: '#6F5410',
          900: '#5A440D',
        },
        cream: {
          50: '#FDFBF7',
          100: '#FAF7F0',
          200: '#F5F0E6',
          300: '#EDE4D1',
          400: '#E2D4B8',
          500: '#D4C19A',
        }
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
        'gradient-cream': 'linear-gradient(135deg, #FDFBF7 0%, #FFFFFF 100%)',
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(212, 175, 55, 0.15)',
        'gold': '0 4px 14px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
