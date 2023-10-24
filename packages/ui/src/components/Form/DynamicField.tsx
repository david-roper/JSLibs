import { useContext, useMemo } from 'react';

import type Types from '@douglasneuroinformatics/form-types';

import { FormContext, type FormState } from '../../context/FormContext';
import { StaticField } from './StaticField';

export type DynamicFieldProps<
  TData extends Types.FormDataType,
  TValue extends Types.ArrayFieldValue | Types.PrimitiveFieldValue
> = Types.DynamicFormField<TData, TValue> & {
  name: string;
  path: string[];
};

export const DynamicField = <
  TData extends Types.FormDataType,
  TValue extends Types.ArrayFieldValue | Types.PrimitiveFieldValue
>({
  name,
  path,
  ...props
}: DynamicFieldProps<TData, TValue>) => {
  const { values } = useContext(FormContext) as FormState<TData>;
  const staticProps = useMemo(() => {
    return props.render(values);
  }, []);

  if (!staticProps) {
    return null;
  }

  return <StaticField name={name} path={path} {...staticProps} />;
};
