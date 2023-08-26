import React from 'react';

import { LanguageToggle, LanguageToggleProps } from '../LanguageToggle/LanguageToggle.js';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle.js';

export type FormPageWrapperProps = {
  title: string;
  children: React.ReactNode;
  logo: string;
  languageToggle: LanguageToggleProps<string>;
  widthMultiplier?: number;
};

/** Standalone page used as a wrapper for forms (e.g., on login page) */
export const FormPageWrapper = ({
  children,
  title,
  logo,
  languageToggle,
  widthMultiplier = 1
}: FormPageWrapperProps) => (
  <div className="flex min-h-screen items-center justify-center">
    <div
      className="flex flex-col m-5 items-center rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800"
      style={{ width: `${24 * widthMultiplier}rem` }}
    >
      <img alt="logo" className="m-2 h-auto w-16" src={logo} />
      <h1 className="text-2xl mb-3 font-bold tracking-tight first-letter:capitalize">{title}</h1>
      {children}
      <div className="mt-5 flex w-full justify-between bg-inherit">
        <LanguageToggle {...languageToggle} />
        <ThemeToggle />
      </div>
    </div>
  </div>
);
