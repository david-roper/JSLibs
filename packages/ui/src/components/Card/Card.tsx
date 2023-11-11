'use client';

import React from 'react';

import { twMerge } from 'tailwind-merge';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(function Card(
  { children, className, ...props },
  ref
) {
  return (
    <div
      className={twMerge(
        'bg-slate-50 dark:bg-slate-800 shadow-sm rounded-md ring-1 ring-slate-900/10 dark:ring-slate-100/25',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
