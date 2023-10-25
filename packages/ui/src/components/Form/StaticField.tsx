import { useCallback } from 'react';

import type Types from '@douglasneuroinformatics/form-types';

import { ArrayField } from './ArrayField';
import { PrimitiveFormField, type PrimitiveFormFieldProps } from './PrimitiveFormField';

import type { FormErrors } from './types';

export type StaticFieldProps<TData extends Types.FormDataType> = {
  errors: FormErrors<TData>;
  field: PrimitiveFormFieldProps['field'] | Types.ArrayFormField;
  name: string;
  setValues: React.Dispatch<React.SetStateAction<Types.NullableFormDataType<TData>>>;
  values: Types.NullableFormDataType<TData>;
};

export const StaticField = <TData extends Types.FormDataType>({
  errors,
  field,
  name,
  setValues,
  values
}: StaticFieldProps<TData>) => {
  const setValue = useCallback(
    <TValue extends Types.UnknownNullableFieldValue>(value: TValue) => {
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
        setValue={setValue}
        value={values[name] as Types.NullableArrayFieldValue}
      />
    );
  }
  return (
    <PrimitiveFormField
      error={errors[name] as string}
      field={field}
      name={name}
      setValue={setValue}
      value={values[name] as Types.NullablePrimitiveFieldValue}
    />
  );
};
