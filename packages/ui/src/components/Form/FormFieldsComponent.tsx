import { useContext } from 'react';

import type Types from '@douglasneuroinformatics/form-types';

import { FormContext, type FormState } from '../../context/FormContext';
import { ArrayField } from './ArrayField';
import { PrimitiveFormField } from './PrimitiveFormField';

export type FormFieldsComponentProps<T extends Types.FormDataType> = {
  fields: Types.FormFields<T>;
};

/** Renders an object containing key value pairs, where the value is a FormField of some kind */
export const FormFieldsComponent = <T extends Types.FormDataType>({ fields }: FormFieldsComponentProps<T>) => {
  const { values } = useContext(FormContext) as FormState<T>;
  return Object.keys(fields).map((name) => {
    const field = fields[name];
    const staticField = field instanceof Function ? field(values) : field;
    if (!staticField) {
      return null;
    } else if (staticField.kind === 'array') {
      return <ArrayField key={name} name={name} path={[name]} {...staticField} />;
    }
    return <PrimitiveFormField key={name} name={name} path={[name]} {...staticField} />;
  });
};
