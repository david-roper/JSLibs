// @ts-check

import path from 'path';
import plugin from 'tailwindcss/plugin';

import tailwindcss from '@headlessui/tailwindcss';
import containerQueries from '@tailwindcss/container-queries';

/**
 * Note, using `__dirname` is a hack which will work when run with bun (e.g., vite dev server)
 * and also when resolved as a CommonJS module by storybook. Once Bun has implemented the
 * necessary Node libraries, this can be replaced by `import.meta.dir`.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [path.resolve(__dirname, './src/**/*.{js,jsx,ts,tsx}')],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem'
        }
      }
    }
  },
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
        '.field-input-base': {
          '@apply w-full bg-transparent py-2 text-left hover:border-slate-300 dark:hover:border-slate-400 focus:border-sky-800 dark:focus:border-sky-500 focus:outline-none':
            {},
          minHeight: '42px'
        },
        '.field-input': {
          '@apply field-input-base border-b-2 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-500':
            {}
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
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      });
    })
  ]
};
