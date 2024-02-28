import { Menu, Transition } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

import { Button, type ButtonProps } from '../Button';
import { Card } from '../Card/Card';
import { DropdownIcon } from './DropdownIcon';

type DropdownOptions = Record<string, string> | readonly string[];

type DropdownOptionKey<T> = T extends readonly string[]
  ? T[number]
  : T extends Record<string, string>
    ? Extract<keyof T, string>
    : never;

export type DropdownProps<T extends DropdownOptions> = {
  className?: string;

  /** Callback function invoked when user clicks an option */
  onSelection: (option: DropdownOptionKey<T>) => void;

  /** Either a list of options for the dropdown, or an object with options mapped to custom labels  */
  options: T;

  size?: ButtonProps['size'];

  /** The text content for the dropdown toggle */
  title: string;

  /** The button variant to use for the dropdown toggle */
  variant?: ButtonProps['variant'];
};

// eslint-disable-next-line react/function-component-definition
export function Dropdown<const T extends DropdownOptions>({
  className,
  onSelection,
  options,
  size,
  title,
  variant
}: DropdownProps<T>) {
  const optionKeys: readonly string[] = options instanceof Array ? options : Object.keys(options);
  return (
    <Menu as="div" className={twMerge('relative w-full whitespace-nowrap', className)}>
      <Menu.Button
        as={Button}
        className="h-full w-full"
        disabled={options.length === 0}
        icon={<DropdownIcon size={size} />}
        iconPosition="right"
        label={title}
        size={size}
        style={{ width: '100%' }}
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
        <Menu.Items as={Card} className="absolute z-10 mt-2 flex w-fit min-w-full flex-col overflow-hidden">
          {optionKeys.map((option) => (
            <Menu.Item key={option}>
              <button
                className="p-2 text-left hover:bg-slate-200 dark:hover:bg-slate-700"
                style={{ minWidth: 100 }}
                onClick={() => {
                  onSelection(option as DropdownOptionKey<T>);
                }}
              >
                {Array.isArray(options) ? option : (options[option as keyof T] as string)}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
