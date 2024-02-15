import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

import { useTheme } from '../../hooks/useTheme';

export type ThemeToggleProps = {
  className?: string;
  size?: number;
};

export const ThemeToggle = ({ className, size = 24 }: ThemeToggleProps) => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      className={twMerge(
        'rounded-md p-2 transition-transform hover:backdrop-brightness-95 dark:hover:backdrop-brightness-150',
        className
      )}
      type="button"
      onClick={toggleTheme}
    >
      <SunIcon className="hidden dark:block" height={size} width={size} />
      <MoonIcon className="dark:hidden" height={size} width={size} />
    </button>
  );
};
