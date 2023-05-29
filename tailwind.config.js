const { blackA, mauve, violet } = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    fontSize: {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 24,
      xl: 32
    },

    colors: {
      cyan: {
        300: '#A3E3FA',
        500: '#81D8F7'
      },

      transparent: 'transparent',

      white: '#ffffff',
      black: '#000',

      gray: {
        900: '#121214',
        600: '#202024',
        300: '#7C7C8A',
        100: '#808080'
      },

      ...blackA,
      ...mauve,
      ...violet,
    },

    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif'
      },

      screens: {
        mediumScreen: {
          raw: '(min-height:648px)',
        },

        smallScreen: {
          raw: '(max-height:600px)',
        },

        mobile: {
          raw: '(max-width: 648px)'
        },



      },

      keyframes: {
        slideUpAndFade: {
          '0%': { opacity: 0, transform: 'translateY(2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          '0%': { opacity: 0, transform: 'translateX(-2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideDownAndFade: {
          '0%': { opacity: 0, transform: 'translateY(-2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          '0%': { opacity: 0, transform: 'translateX(2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        slideUpAndFade: 'slideUpAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)',
        slideDownAndFade: 'slideDownAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)',
        slideRightAndFade: 'slideRightAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)',
        slideLeftAndFade: 'slideLeftAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)',
      },
    },
  },
  plugins: [],
}