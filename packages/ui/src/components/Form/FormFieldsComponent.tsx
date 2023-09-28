import { useContext } from 'react';

import type {
  FormFields,
  FormInstrumentData,
  NullableArrayFieldValue,
  NullablePrimitiveFieldValue
} from '@douglasneuroinformatics/form-types';

import { FormContext, type FormState } from '../../context/FormContext';

import { ArrayField, PrimitiveFormField } from '.';
import type { ArrayFieldProps, PrimitiveFormFieldProps } from '.';

export type FormFieldsComponentProps<T extends FormInstrumentData> = {
  fields: FormFields<T>;
};

/** Renders an object containing key value pairs, where the value is a FormField of some kind */
export const FormFieldsComponent = <T extends FormInstrumentData>({ fields }: FormFieldsComponentProps<T>) => {
  const { errors, values, setValues } = useContext(FormContext) as FormState<T>;
  return (
    <>
      {Object.keys(fields).map((fieldName: keyof T) => {
        const props = {
          name: fieldName,
          error: errors[fieldName],
          value: values[fieldName],
          setValue: (value: NullablePrimitiveFieldValue | NullableArrayFieldValue) => {
            setValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
          },
          ...fields[fieldName]
        };
        if (props.kind === 'array') {
          return <ArrayField {...(props as ArrayFieldProps)} key={fieldName.toString()} />;
        } else {
          return <PrimitiveFormField {...(props as PrimitiveFormFieldProps)} key={fieldName.toString()} />;
        }
      })}
    </>
  );
};
