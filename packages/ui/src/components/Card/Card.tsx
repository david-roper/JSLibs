import React from 'react';

import { twMerge } from 'tailwind-merge';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(function Card(
  { children, className, ...props },
  ref
) {
  return (
    <div
      className={twMerge(
        'bg-slate-50 dark:bg-slate-800 shadow-md rounded-md ring-1 ring-slate-900/5 dark:ring-slate-100/20',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
