import React from 'react';

import { clsx } from 'clsx';

export type DividerProps = {
  variant?: 'light' | 'dark';
} & React.ComponentPropsWithoutRef<'div'>

export const Divider = ({ className, variant = 'light', ...props }: DividerProps) => {
  return <hr className={clsx({ 'border-slate-300': variant === 'light' }, 'my-5 w-full', className)} {...props} />;
};
