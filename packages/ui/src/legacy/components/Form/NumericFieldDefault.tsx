import React from 'react';

import { clsx } from 'clsx';
import type { Simplify } from 'type-fest';

import { FormFieldContainer } from './FormFieldContainer';

import type { NumericFieldProps } from './NumericField';

export type NumericFieldDefaultProps = Simplify<Extract<NumericFieldProps, { variant: 'default' }>>;

export const NumericFieldDefault = ({
  description,
  error,
  label,
  max,
  min,
  name,
  setValue,
  value
}: NumericFieldDefaultProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = parseFloat(event.target.value);
    if (Number.isNaN(newValue)) {
      setValue(undefined);
    } else if (newValue >= (min ?? -Infinity) && newValue <= (max ?? Infinity)) {
      setValue(newValue);
    }
  };

  return (
    <FormFieldContainer description={description} error={error}>
      <input
        className="field-input peer"
        max={max}
        min={min}
        name={name}
        type="text"
        value={value ?? ''}
        onChange={handleChange}
      />
      <label
        className={clsx('field-label field-label-floating peer-focus:field-label-floating--active', {
          'field-label-floating--active': typeof value === 'number'
        })}
        htmlFor={name}
      >
        {label}
      </label>
    </FormFieldContainer>
  );
};
