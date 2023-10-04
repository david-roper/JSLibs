'use client';

import { BinaryField, type BinaryFieldProps } from './BinaryField';
import { DateField, type DateFieldProps } from './DateField';
import { NumericField, type NumericFieldProps } from './NumericField';
import { OptionsField, type OptionsFieldProps } from './OptionsField';
import { TextField, type TextFieldProps } from './TextField';

export type PrimitiveFormFieldProps =
  | BinaryFieldProps
  | DateFieldProps
  | NumericFieldProps
  | OptionsFieldProps
  | TextFieldProps;

export const PrimitiveFormField = (props: PrimitiveFormFieldProps) => {
  switch (props.kind) {
    case 'text':
      return <TextField {...props} key={props.name} />;
    case 'numeric':
      return <NumericField {...props} key={props.name} />;
    case 'options':
      return <OptionsField {...props} key={props.name} />;
    case 'date':
      return <DateField {...props} key={props.name} />;
    case 'binary':
      return <BinaryField {...props} key={props.name} />;
  }
};
