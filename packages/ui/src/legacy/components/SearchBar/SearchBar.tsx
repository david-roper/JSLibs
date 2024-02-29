import React from 'react';

import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

export type SearchBarProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'type'> & {
  size: 'lg' | 'md' | 'sm' | 'xs';
};

export const SearchBar = ({ className, placeholder, size, ...props }: SearchBarProps) => {
  const { t } = useTranslation();
  return (
    <input
      className={twMerge(
        'dark:highlight-white/5 w-full items-center rounded-md border border-slate-200 text-left text-sm text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700',
        size === 'xs' && 'p-1.5',
        size === 'sm' && 'p-2',
        size === 'md' && 'p-2.5',
        size === 'lg' && 'p-3',
        className
      )}
      placeholder={placeholder ?? t('searchBar.placeholder')}
      type="search"
      {...props}
    />
  );
};
