import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

export type UpdateTheme = (theme: Theme) => void;

export function useTheme(): readonly [Theme, UpdateTheme] {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Initial theme value is based on the value saved in local storage or the system theme
    const initialTheme: Theme =
      (window.localStorage.getItem('theme') as Theme | null) ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-mode', initialTheme);
    setTheme(initialTheme);

    // Whenever the data-mode attribute of the root HTML element changes, update state and local storage
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-mode') {
          const updatedTheme = (mutation.target as HTMLHtmlElement).getAttribute('data-mode');
          if (updatedTheme === 'light' || updatedTheme === 'dark') {
            window.localStorage.setItem('theme', updatedTheme);
            setTheme(updatedTheme);
          } else {
            console.error(`Unexpected value for 'data-mode' attribute: ${updatedTheme}`);
          }
        }
      });
    });
    observer.observe(document.documentElement, {
      attributes: true
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  // When the user wants to change the theme
  const updateTheme = useCallback((theme: Theme) => {
    document.documentElement.setAttribute('data-mode', theme);
  }, []);

  return [theme, updateTheme] as const;
}
