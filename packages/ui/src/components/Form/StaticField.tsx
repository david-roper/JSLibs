import { useCallback } from 'react';

import type Types from '@douglasneuroinformatics/form-types';

import { ArrayField } from './ArrayField';
import { PrimitiveFormField, type PrimitiveFormFieldProps } from './PrimitiveFormField';

import type { FieldError, FormErrors } from './types';

export type StaticFieldProps<TData extends Types.FormDataType> = {
  errors: FormErrors<TData>;
  field: PrimitiveFormFieldProps['field'] | Types.ArrayFormField;
  name: string;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors<TData>>>;
  setValues: React.Dispatch<React.SetStateAction<Types.PartialFormDataType<TData>>>;
  values: Types.PartialFormDataType<TData>;
};

export const StaticField = <TData extends Types.FormDataType>({
  errors,
  field,
  name,
  setErrors,
  setValues,
  values
}: StaticFieldProps<TData>) => {
  const setError = useCallback(
    <TValue extends Types.FormFieldValue>(error: FieldError<TValue>) => {
      return setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    },
    [setErrors]
  );

  const setValue = useCallback(
    <TValue extends Types.FormFieldValue>(value: TValue) => {
      return setValues((prevValues) => ({ ...prevValues, [name]: value }));
    },
    [setValues]
  );

  if (field.kind === 'array') {
    return (
      <ArrayField
        {...field}
        error={errors[name] as Record<string, string>[]}
        name={name}
        setError={setError}
        setValue={setValue}
        value={values[name] as Types.ArrayFieldValue}
      />
    );
  }
  return (
    <PrimitiveFormField
      error={errors[name] as string}
      field={field}
      name={name}
      setError={setError}
      setValue={setValue}
      value={values[name] as Types.PrimitiveFieldValue}
    />
  );
};
