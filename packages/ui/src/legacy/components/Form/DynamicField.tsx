import { useEffect, useMemo, useState } from 'react';

import type Types from '@douglasneuroinformatics/form-types';
import _ from 'lodash';

import { StaticField } from './StaticField';

import type { FormErrors } from './types';

export type DynamicFieldProps<TData extends Types.FormDataType> = {
  errors: FormErrors<TData>;
  field: Types.DynamicFormField<TData>;
  name: string;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors<TData>>>;
  setValues: React.Dispatch<React.SetStateAction<Types.PartialFormDataType<TData>>>;
  values: Types.PartialFormDataType<TData>;
};

export const DynamicField = <TData extends Types.FormDataType>({
  field,
  name,
  values,
  ...props
}: DynamicFieldProps<TData>) => {
  const [dependentValues, setDependentValues] = useState(_.pick(values, field.deps));

  const staticField = useMemo(() => {
    return field.render(values);
  }, [dependentValues, field.render]);

  useEffect(() => {
    for (const key of field.deps) {
      if (dependentValues[key] !== values[key]) {
        setDependentValues(_.pick(values, field.deps));
        break;
      }
    }
  }, [field.deps, values]);

  if (!staticField) {
    return null;
  }

  return <StaticField {...props} field={staticField} name={name} values={values} />;
};
