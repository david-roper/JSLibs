import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

type SetTheme = (theme: Theme) => void;

function useTheme(): readonly [Theme, SetTheme] {
  // Initial theme value is based on the value saved in local storage or the system theme
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, setTheme] as const;
}

export { type Theme, useTheme };
