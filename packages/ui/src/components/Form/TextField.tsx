'use client';

import React, { useState } from 'react';

import type { TextFormField } from '@douglasneuroinformatics/form-types';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { match } from 'ts-pattern';

import { FormFieldContainer } from './FormFieldContainer';
import { type BaseFieldComponentProps } from './types';

type TextFieldProps = BaseFieldComponentProps<string> & TextFormField;

type PasswordInputProps = Pick<TextFieldProps, 'name' | 'value' | 'description'> & {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const PasswordInput = ({ name, value, onChange, description }: PasswordInputProps) => {
  const [show, setShow] = useState(false);
  return (
    <React.Fragment>
      <input
        autoComplete="off"
        className={clsx('field-input peer')}
        name={name}
        type={show ? 'text' : 'password'}
        value={value ?? ''}
        onChange={onChange}
      />
      {!description && (
        <div className="absolute h-full flex items-center justify-center right-0">
          <button
            type="button"
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? (
              <EyeSlashIcon className="text-slate-600 dark:text-slate-300" height={16} width={16} />
            ) : (
              <EyeIcon className="text-slate-600 dark:text-slate-300" height={16} width={16} />
            )}
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

const TextField = ({ description, name, label, variant, error, value, setValue }: TextFieldProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormFieldContainer description={description} error={error}>
      {match(variant)
        .with('short', () => (
          <input
            autoComplete="off"
            className="field-input peer"
            name={name}
            type="text"
            value={value ?? ''}
            onChange={handleChange}
          />
        ))
        .with('password', () => (
          <PasswordInput description={description} name={name} value={value} onChange={handleChange} />
        ))
        .with('long', () => (
          <textarea
            autoComplete="off"
            className="field-input peer"
            rows={5}
            value={value ?? ''}
            onChange={handleChange}
          />
        ))
        .exhaustive()}
      <label
        className={clsx('field-label field-label-floating peer-focus:field-label-floating--active', {
          'field-label-floating--active': value
        })}
        htmlFor={name}
      >
        {label}
      </label>
    </FormFieldContainer>
  );
};

export { TextField, type TextFieldProps };
