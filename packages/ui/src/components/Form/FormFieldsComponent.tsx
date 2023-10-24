import type Types from '@douglasneuroinformatics/form-types';

import { DynamicField } from './DynamicField';
import { StaticField } from './StaticField';

export type FormFieldsComponentProps<T extends Types.FormDataType> = {
  fields: Types.FormFields<T>;
};

/** Renders an object containing key value pairs, where the value is a FormField of some kind */
export const FormFieldsComponent = <T extends Types.FormDataType>({ fields }: FormFieldsComponentProps<T>) => {
  return Object.keys(fields).map((name) => {
    const field = fields[name]!;
    if (field.kind === 'dynamic') {
      return <DynamicField key={name} name={name} path={[name]} {...field} />;
    }
    return <StaticField key={name} name={name} path={[name]} {...field} />;
  });
};
