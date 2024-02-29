import type { HTMLProps } from 'react';

import { cn } from '@/utils';

export const Spinner = ({ className, ...props }: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={cn('flex h-full w-full items-center justify-center', className)} {...props}>
      <span
        className="text-slate-900 animate-spinner dark:text-slate-100 overflow-hidden relative"
        style={{
          borderRadius: '50%',
          fontSize: '45px',
          height: '1em',
          textIndent: '-9999em',
          transform: 'translateZ(0)',
          width: '1em'
        }}
      />
    </div>
  );
};
