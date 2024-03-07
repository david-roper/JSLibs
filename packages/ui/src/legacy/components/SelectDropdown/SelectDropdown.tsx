import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';

import { Button, type ButtonProps } from '../Button/Button';
import { Card } from '../Card/Card';
import { DropdownIcon } from '../Dropdown/DropdownIcon';

export type SelectOption = {
  key: string;
  label: string;
};

export type SelectDropdownProps<T extends SelectOption> = {
  checkPosition?: 'left' | 'right';
  className?: string;
  options: T[];
  selected: T[];
  setSelected: (selected: T[]) => void;
  title: string;
  /** The button variant to use for the dropdown toggle */
  variant?: ButtonProps['variant'];
};

export const SelectDropdown = <T extends SelectOption>({
  checkPosition = 'right',
  className,
  options,
  selected,
  setSelected,
  title,
  variant
}: SelectDropdownProps<T>) => {
  // Here we specify the key prop of objects for comparison
  return (
    <Listbox
      multiple
      as="div"
      by="key"
      className={clsx('relative flex w-full', className)}
      value={selected}
      onChange={setSelected}
    >
      <Listbox.Button
        as={Button}
        className="h-full w-full"
        icon={<DropdownIcon />}
        iconPosition="right"
        label={title}
        variant={variant}
      />
      <Transition
        as="div"
        className="absolute bottom-0 z-10 w-full"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Listbox.Options
          as={Card}
          className="scrollbar-none absolute z-10 mt-2 flex max-h-80 min-w-full flex-col overflow-scroll"
        >
          {options.map((option) => (
            <Listbox.Option
              className="flex w-full items-center whitespace-nowrap bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 p-2 hover:bg-slate-200 "
              data-cy="select-dropdown-option"
              key={option.key}
              value={option}
            >
              {checkPosition === 'left' && (
                <CheckIcon className="ui-selected:visible invisible mr-2 h-6" height={16} width={16} />
              )}
              <span className="ui-selected:font-medium" data-cy="select-dropdown-option-label">
                {option.label}
              </span>
              {checkPosition === 'right' && (
                <CheckIcon className="ui-selected:visible invisible ml-2" height={16} width={16} />
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};
