import React from 'react';

import { twMerge } from 'tailwind-merge';

export const Card = ({ className, children, ...props }: React.HTMLProps<HTMLDivElement>) => (
  <div className={twMerge('dark:bg-slate-800 shadow-lg p-3 ring-1 ring-slate-900/5', className)} {...props}>
    {children}
  </div>
);
