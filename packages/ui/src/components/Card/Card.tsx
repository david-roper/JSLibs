import React from 'react';

import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, ...props }: React.HTMLProps<HTMLDivElement>) => (
  <div className={twMerge('bg-slate-50 dark:bg-slate-800 shadow-lg ring-1 ring-slate-900/5', className)} {...props}>
    {children}
  </div>
);
