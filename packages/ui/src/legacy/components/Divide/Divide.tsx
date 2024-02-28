import React from 'react';

import { twMerge } from 'tailwind-merge';

export const Divide = ({ className, ...props }: React.ComponentPropsWithoutRef<'hr'>) => (
  <hr className={twMerge('mt-auto h-[1px] border-none bg-slate-300 dark:bg-slate-700', className)} {...props} />
);
