import React from 'react';

import { Popover, Transition } from '@headlessui/react';

import { cn } from '../../utils/cn';

export type PopoverIconProps = {
  icon: React.ComponentType<Omit<React.SVGProps<SVGSVGElement>, 'ref'>>;
  iconClassName?: string;
  position: 'left' | 'right';
  text: string;
};

export const PopoverIcon = ({ icon, iconClassName, position, text }: PopoverIconProps) => {
  // TypeScript wants components to start with capital letter
  const Icon = icon;
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center justify-center" tabIndex={-1}>
        <Icon className={cn('text-slate-600 dark:text-slate-300 h-4 w-4', iconClassName)} />
      </Popover.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          className={cn(
            'absolute z-10 mt-2 w-max max-w-xs rounded-md border border-slate-300 bg-slate-100 p-2 text-sm text-slate-600 shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300',
            {
              'left-0': position === 'left',
              'right-0': position === 'right'
            }
          )}
        >
          <p>{text}</p>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
