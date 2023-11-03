'use client';

import React from 'react';

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import type { Simplify } from 'type-fest';

import { PopoverIcon } from '../..';
import { FormFieldContainer } from './FormFieldContainer';

import type { NumericFieldProps } from './NumericField';

export type NumericFieldSliderProps = Simplify<Extract<NumericFieldProps, { variant: 'slider' }>>;

export const NumericFieldSlider = ({
  description,
  error,
  label,
  max,
  min,
  name,
  setValue,
  value
}: NumericFieldSliderProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = parseFloat(event.target.value);
    if (Number.isNaN(newValue)) {
      setValue(null);
    } else if (newValue >= min && newValue <= max) {
      setValue(newValue);
    }
  };

  return (
    <FormFieldContainer error={error}>
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
    </FormFieldContainer>
  );
};
