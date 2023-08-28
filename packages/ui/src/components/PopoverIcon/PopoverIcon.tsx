'use client';

import React from 'react';

import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';

export type PopoverIconProps = {
  icon: React.ComponentType<Omit<React.SVGProps<SVGSVGElement>, 'ref'>>;
  text: string;
  position: 'left' | 'right';
};

export const PopoverIcon = ({ icon, text, position }: PopoverIconProps) => {
  // TypeScript wants components to start with capital letter
  const Icon = icon;
  return (
    <Popover className="relative w-fit">
      <Popover.Button className="flex items-center justify-center" tabIndex={-1}>
        <Icon className="text-slate-600 dark:text-slate-300" height={16} width={16} />
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
          className={clsx(
            'absolute z-10 mt-2 max-w-xs whitespace-nowrap rounded-lg border border-slate-300 bg-slate-100 p-2 text-sm text-slate-600 shadow-lg dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300',
            {
              'left-0': position === 'left',
              'right-0': position === 'right'
            }
          )}
        >
          {text}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
