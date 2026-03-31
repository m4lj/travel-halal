/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        islamic: {
          green:      '#1B5E20',
          greenLight: '#2E7D32',
          greenMid:   '#388E3C',
          greenPale:  '#E8F5E9',
          gold:       '#F9A825',
          goldLight:  '#FFF8E1',
          goldDark:   '#F57F17',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

