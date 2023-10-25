import type Types from '@douglasneuroinformatics/form-types';

import { DynamicField } from './DynamicField';
import { StaticField } from './StaticField';

import type { FormErrors } from './types';

export type FormFieldsComponentProps<T extends Types.FormDataType> = {
  errors: FormErrors<T>;
  fields: Types.FormFields<T>;
  setValues: React.Dispatch<React.SetStateAction<Types.NullableFormDataType<T>>>;
  values: Types.NullableFormDataType<T>;
};

/** Renders an object containing key value pairs, where the value is a FormField of some kind */
export const FormFieldsComponent = <T extends Types.FormDataType>({
  errors,
  fields,
  setValues,
  values
}: FormFieldsComponentProps<T>) => {
  return Object.keys(fields).map((name) => {
    const field = fields[name]!;
    if (field.kind === 'dynamic') {
      return (
        <DynamicField errors={errors} field={field} key={name} name={name} setValues={setValues} values={values} />
      );
    }
    return <StaticField errors={errors} field={field} key={name} name={name} setValues={setValues} values={values} />;
  });
};
