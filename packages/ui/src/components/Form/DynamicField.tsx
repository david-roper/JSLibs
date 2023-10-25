import { useEffect, useMemo, useState } from 'react';

import type Types from '@douglasneuroinformatics/form-types';
import { pick } from 'lodash';

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
  const [dependentValues, setDependentValues] = useState(pick(values, field.deps));

  const staticField = useMemo(() => {
    return field.render(values);
  }, [dependentValues, field.render]);

  useEffect(() => {
    for (const key of field.deps) {
      if (dependentValues[key] !== values[key]) {
        setDependentValues(pick(values, field.deps));
        break;
      }
    }
  }, [field.deps, values]);

  if (!staticField) {
    return null;
  }

  return <StaticField errors={errors} field={staticField} name={name} setValues={setValues} values={values} />;
};
