import React from 'react';

import { twMerge } from 'tailwind-merge';

import { Card } from '../Card/Card';
import { LanguageToggle, type LanguageToggleProps } from '../LanguageToggle/LanguageToggle';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

export type FormPageWrapperProps = {
  children: React.ReactNode;
  className?: string;
  languageToggle: LanguageToggleProps<string>;
  logo: string;
  title: string;
  widthMultiplier?: number;
};

/** Standalone page used as a wrapper for forms (e.g., on login page) */
export const FormPageWrapper = ({
  children,
  className,
  languageToggle,
  logo,
  title,
  widthMultiplier = 1
}: FormPageWrapperProps) => (
  <div className={twMerge('flex min-h-screen items-center justify-center', className)}>
    <Card className="flex flex-col m-5 items-center rounded-2xl p-8" style={{ width: `${24 * widthMultiplier}rem` }}>
      <img alt="logo" className="m-2 h-auto w-16" src={logo} />
      <h1 className="text-2xl mb-3 font-bold tracking-tight first-letter:capitalize">{title}</h1>
      {children}
      <div className="mt-5 flex w-full justify-between bg-inherit">
        <LanguageToggle {...languageToggle} />
        <ThemeToggle />
      </div>
    </Card>
  </div>
);
