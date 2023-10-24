import { useContext } from 'react';

import type { UnknownNullableFieldValue } from '@douglasneuroinformatics/form-types';
import { get, set } from 'lodash';

import { FormContext } from '../context/FormContext';

import type { FieldError } from '..';

export function useFormField<TValue extends UnknownNullableFieldValue>(path: string[]) {
  const { errors, setValues, values } = useContext(FormContext);
  return {
    error: get(errors, path) as FieldError<TValue>,
    setValue: (value: TValue | null) => {
      setValues((prevValues) => {
        const updatedValues = structuredClone(prevValues);
        return set(updatedValues, path, value);
      });
    },
    value: get(values, path) as TValue | null
  };
}
