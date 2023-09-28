import { useContext } from 'react';

import type {
  FormFields,
  FormInstrumentData,
  UnknownFormField,
  UnknownNullableFieldValue
} from '@douglasneuroinformatics/form-types';

import { FormContext, type FormState } from '../../context/FormContext';

import { ArrayField, PrimitiveFormField } from '.';
import type { ArrayFieldProps, BaseFieldComponentProps, PrimitiveFormFieldProps, UnknownFieldComponentProps } from '.';

export type FormFieldsComponentProps<T extends FormInstrumentData> = {
  fields: FormFields<T>;
};

/** Renders an object containing key value pairs, where the value is a FormField of some kind */
export const FormFieldsComponent = <T extends FormInstrumentData>({ fields }: FormFieldsComponentProps<T>) => {
  const { errors, values, setValues } = useContext(FormContext) as FormState<T>;
  return (
    <>
      {Object.keys(fields).map((fieldName: keyof T) => {
        const field: UnknownFormField<T> = fields[fieldName];
        const staticField = field instanceof Function ? field(values) : field;
        if (!staticField) {
          return null;
        }
        const value: UnknownNullableFieldValue = values[fieldName];
        const baseProps: BaseFieldComponentProps = {
          name: fieldName as string,
          error: errors[fieldName],
          value: value,
          setValue: (value) => {
            setValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
          }
        };
        const props: UnknownFieldComponentProps<T> = { ...staticField, ...baseProps };
        if (props.kind === 'array') {
          return <ArrayField {...(props as ArrayFieldProps)} key={fieldName.toString()} />;
        }
        return <PrimitiveFormField {...(props as PrimitiveFormFieldProps)} key={fieldName.toString()} />;
      })}
    </>
  );
};
