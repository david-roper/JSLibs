import { useContext } from 'react';

import type Types from '@douglasneuroinformatics/form-types';

import { FormContext, type FormState } from '../../context/FormContext';
import { ArrayField } from './ArrayField';
import { PrimitiveFormField } from './PrimitiveFormField';

import type { ArrayFieldProps } from './ArrayField';
import type { PrimitiveFormFieldProps } from './PrimitiveFormField';
import type { BaseFieldComponentProps, UnknownFieldComponentProps } from './types';

export type FormFieldsComponentProps<T extends Types.FormDataType> = {
  fields: Types.FormFields<T>;
};

/** Renders an object containing key value pairs, where the value is a FormField of some kind */
export const FormFieldsComponent = <T extends Types.FormDataType>({ fields }: FormFieldsComponentProps<T>) => {
  const { errors, setValues, values } = useContext(FormContext) as FormState<T>;
  return (
    <>
      {Object.keys(fields).map((fieldName: keyof T) => {
        const field: Types.UnknownFormField<T> = fields[fieldName];
        const staticField = field instanceof Function ? field(values) : field;
        if (!staticField) {
          return null;
        }
        const value: Types.UnknownNullableFieldValue = values[fieldName];
        const baseProps: BaseFieldComponentProps = {
          error: errors[fieldName],
          name: fieldName as string,
          setValue: (value) => {
            setValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
          },
          value: value
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
