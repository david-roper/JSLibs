import { useMemo } from 'react';

import type Types from '@douglasneuroinformatics/form-types';

import { StaticField } from './StaticField';

import type { FormErrors } from './types';

export type DynamicFieldProps<
  TData extends Types.FormDataType,
  TValue extends Types.ArrayFieldValue | Types.PrimitiveFieldValue
> = {
  errors: FormErrors<TData>;
  field: Types.DynamicFormField<TData, TValue>;
  name: string;
  setValues: React.Dispatch<React.SetStateAction<Types.NullableFormDataType<TData>>>;
  values: Types.NullableFormDataType<TData>;
};

export const DynamicField = <
  TData extends Types.FormDataType,
  TValue extends Types.ArrayFieldValue | Types.PrimitiveFieldValue
>({
  errors,
  field,
  name,
  setValues,
  values
}: DynamicFieldProps<TData, TValue>) => {
  const staticField = useMemo(() => {
    return field.render(values);
  }, [values]);

  if (!staticField) {
    return null;
  }

  return <StaticField errors={errors} field={staticField} name={name} setValues={setValues} values={values} />;
};
