'use client';

import React from 'react';

import { NumericFormField } from '@douglasneuroinformatics/form-types';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

import { PopoverIcon } from '../PopoverIcon/PopoverIcon.js';

import { FormFieldContainer } from './FormFieldContainer.js';
import { BaseFieldProps } from './types.js';

export type NumericFieldProps = BaseFieldProps<number | null> & NumericFormField;

export const NumericField = ({
  description,
  name,
  label,
  min,
  max,
  error,
  value,
  setValue,
  variant
}: NumericFieldProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = parseFloat(event.target.value);
    if (Number.isNaN(newValue)) {
      setValue(null);
    } else if (newValue >= min && newValue <= max) {
      setValue(newValue);
    }
  };

  return (
    <FormFieldContainer description={variant === 'default' ? description : undefined} error={error}>
      {variant === 'default' && (
        <>
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
              'field-label-floating--active': value !== null
            })}
            htmlFor={name}
          >
            {`${label} (${min}-${max})`}
          </label>
        </>
      )}
      {variant === 'slider' && (
        <>
          <label className="field-label" htmlFor={name}>
            {label}
          </label>
          <div className="flex gap-3">
            <input
              className="field-input-base"
              max={max}
              min={min}
              name={name}
              type="range"
              value={value ?? min}
              onChange={handleChange}
            />
            <div className="flex items-center justify-center text-slate-600 dark:text-slate-300">{value ?? min}</div>
            {description && (
              <div className="flex items-center justify-center">
                <PopoverIcon icon={QuestionMarkCircleIcon} position="right" text={description} />
              </div>
            )}
          </div>
        </>
      )}
    </FormFieldContainer>
  );
};
