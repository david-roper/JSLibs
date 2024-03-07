import React from 'react';

import type { OptionsFormField } from '@douglasneuroinformatics/form-types';
import { Listbox, Transition } from '@headlessui/react';
import { clsx } from 'clsx';

import { Card } from '../..';
import { FormFieldContainer } from './FormFieldContainer';
import { type BaseFieldComponentProps } from './types';

export type OptionsFieldProps<T extends string = string> = BaseFieldComponentProps<T> & OptionsFormField<T>;

export const OptionsField = <T extends string = string>({
  description,
  error,
  label,
  name,
  options,
  setValue,
  value
}: OptionsFieldProps<T>) => {
  return (
    <FormFieldContainer description={description} error={error}>
      <Listbox as={React.Fragment} name={name} value={value ?? null} onChange={setValue}>
        {({ open }) => (
          <>
            <Listbox.Button className="field-input capitalize" data-cy="option-form">
              {value ? options[value] : ''}
            </Listbox.Button>
            <Listbox.Label
              className={clsx('field-label-floating', {
                'field-label-floating--active': value ?? open
              })}
            >
              {label}
            </Listbox.Label>
            <Transition
              as="div"
              className="relative inline-block"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options as={Card} className="scrollbar-none absolute z-10 mt-1 max-h-80 w-full overflow-scroll">
                {Object.keys(options).map((option) => (
                  <Listbox.Option
                    className="p-2 capitalize hover:bg-slate-200 dark:hover:bg-slate-700"
                    data-cy="form-option-item"
                    key={option}
                    value={option}
                  >
                    {options[option as T]}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </FormFieldContainer>
  );
};
