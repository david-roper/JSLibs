import React from 'react';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import type { Promisable } from 'type-fest';

import { cn } from '../../utils/cn';

export type BaseLanguageToggleProps<T extends string> = {
  className?: string;
  dropdownDirection?: 'down' | 'up';
  i18n: {
    changeLanguage: (lang: T) => Promisable<unknown>;
    resolvedLanguage?: T;
  };
  options: T[];
};

export const BaseLanguageToggle = <T extends string = string>({
  className,
  dropdownDirection,
  i18n,
  options
}: BaseLanguageToggleProps<T>) => {
  return (
    <Menu as="div" className={cn('relative bg-inherit', className)}>
      <Menu.Button
        className="flex items-center justify-center rounded-md p-2 hover:backdrop-brightness-95 dark:hover:backdrop-brightness-150"
        type="button"
      >
        <span className="uppercase">{i18n.resolvedLanguage}</span>
        <ChevronDownIcon className={cn('ml-1', { 'rotate-180': dropdownDirection === 'up' })} height={16} width={16} />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={cn(
            'absolute flex min-w-full z-30 flex-col bg-inherit bg-opacity-100 shadow-sm rounded-md ring-1 ring-slate-900/5 dark:ring-slate-100/20',
            {
              'bottom-12': dropdownDirection === 'up',
              'right-0 mt-2 origin-right': dropdownDirection !== 'up'
            }
          )}
        >
          {options.map((lang) => (
            <Menu.Item
              as="button"
              className="p-2 uppercase first:rounded-t-md last:rounded-b-md hover:backdrop-brightness-95 dark:hover:backdrop-brightness-150"
              key={lang}
              type="button"
              onClick={() => void i18n.changeLanguage(lang)}
            >
              {lang}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
