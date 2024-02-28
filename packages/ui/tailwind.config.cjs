const fs = require('fs');
const path = require('path');

const animate = require('tailwindcss-animate');
const headlessui = require('@headlessui/tailwindcss');
const containerQueries = require('@tailwindcss/container-queries');
const plugin = require('tailwindcss/plugin');

const isDev = fs.existsSync(path.resolve(__dirname, 'src'));

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [isDev ? path.resolve(__dirname, 'src/**/*.{js,jsx,ts,tsx}') : path.resolve(__dirname, 'dist/index.js')],
  darkMode: ['class', '[data-mode="dark"]'],
  plugins: [
    animate,
    containerQueries,
    headlessui,
    plugin(({ addComponents, addUtilities }) => {
      addComponents({
        '.field-input': {
          '@apply field-input-base border-b-2 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-500':
            {}
        },
        '.field-input-base': {
          '@apply w-full bg-transparent py-2 text-left hover:border-slate-300 dark:hover:border-slate-400 focus:border-sky-800 dark:focus:border-sky-500 focus:outline-none':
            {},
          minHeight: '42px'
        },
        '.field-label': {
          '@apply first-letter:capitalize pointer-events-none text-slate-700 dark:text-slate-300': {}
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
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        spinner: 'spinner-spin 1.7s infinite ease, round 1.7s infinite ease'
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        background: 'var(--background)',
        border: 'var(--border)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)'
        },
        foreground: 'var(--foreground)',
        input: 'var(--input)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        },
        ring: 'var(--ring)',
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)'
        }
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
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
