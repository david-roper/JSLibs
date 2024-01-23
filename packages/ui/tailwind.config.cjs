const path = require('path');

const tailwindcss = require('@headlessui/tailwindcss');
const containerQueries = require('@tailwindcss/container-queries');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // eslint-disable-next-line no-undef
  content: [path.resolve(__dirname, './src/**/*.{js,jsx,ts,tsx}')],
  darkMode: ['class', '[data-mode="dark"]'],
  plugins: [
    containerQueries,
    tailwindcss,
    plugin(({ addBase, addComponents, addUtilities, theme }) => {
      addBase({
        'html.dark': {
          backgroundColor: theme('colors.slate.900'),
          color: theme('colors.slate.100')
        },
        'html.light': {
          backgroundColor: theme('colors.slate.100'),
          color: theme('colors.slate.900')
        }
      });
      addComponents({
        '.field-input': {
          '@apply field-input-base border-b-2 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-500':
            {}
        },
        '.field-input-base': {
          '@apply w-full bg-transparent py-2 text-left hover:border-slate-300 dark:hover:border-slate-400 focus:border-sky-800 dark:focus:border-sky-500 focus:outline-none':
            {},
          minHeight: '42px'
        },
        '.field-label': {
          '@apply first-letter:capitalize pointer-events-none text-slate-600 dark:text-slate-300': {}
        },
        '.field-label-floating': {
          '@apply field-label absolute left-0 transition-all': {}
        },
        '.field-label-floating--active': {
          '@apply -translate-y-5 text-sm text-sky-800 dark:text-sky-500': {}
        }
      });
      addUtilities({
        '.scrollbar-none': {
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        }
      });
    })
  ],
  theme: {
    extend: {
      animation: {
        spinner: 'spinner-spin 1.7s infinite ease, round 1.7s infinite ease'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          lg: '4rem',
          sm: '2rem',
          xl: '5rem'
        }
      },
      keyframes: {
        round: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        },
        'spinner-spin': {
          '0%, 5%, 95%, 100%': {
            boxShadow: `0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em`
          },
          '10%, 59%': {
            boxShadow: `0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em`
          },
          '20%': {
            boxShadow: `0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em`
          },
          '38%': {
            boxShadow: `0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em`
          }
        }
      }
    }
  }
};
