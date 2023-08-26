import React from 'react';

import { twMerge } from 'tailwind-merge';

import { LanguageToggle } from '../LanguageToggle/LanguageToggle.js';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle.js';

export type FormPageWrapperProps = {
  title: string;
  children: React.ReactNode;
  logo: string;
  languageOptions: string[];
  className?: string;
};

/** Standalone page used as a wrapper for forms (e.g., on login page) */
export const FormPageWrapper = ({ children, title, logo, languageOptions, className }: FormPageWrapperProps) => (
  <div className={twMerge('flex h-screen w-screen items-center justify-center', className)}>
    <div className="flex w-[22rem] flex-col items-center rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800">
      <img alt="logo" className="m-1 h-auto w-16" src={logo} />
      <h1 className="text-2xl font-bold tracking-tight first-letter:capitalize">{title}</h1>
      {children}
      <div className="mt-3 flex w-full justify-between bg-inherit">
        <LanguageToggle options={languageOptions} />
        <ThemeToggle />
      </div>
    </div>
  </div>
);
