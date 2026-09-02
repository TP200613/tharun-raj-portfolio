/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#FDF2F4',
          100: '#FBE6EA',
          200: '#F6CDD5',
          300: '#EEA4B3',
          400: '#E06D85',
          500: '#C83B5A',
          600: '#983244',
          700: '#6E1A27',
          800: '#4A0E17',
          900: '#260D15',
          950: '#1A080E',
          DEFAULT: '#4A0E17',
        },
        gold: {
          50: '#FAF6F0',
          100: '#F5EBE1',
          200: '#E5D3B3',
          300: '#D7B578',
          400: '#C8A464',
          500: '#B8860B',
          600: '#9E7A38',
          700: '#7E602A',
          800: '#5E461E',
          900: '#3E2E14',
          sand: '#C8A464',
          DEFAULT: '#C8A464',
        },
      },
    },
  },
  plugins: [],
}
