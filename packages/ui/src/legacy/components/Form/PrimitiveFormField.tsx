import type Types from '@douglasneuroinformatics/form-types';

import { BinaryField, type BinaryFieldProps } from './BinaryField';
import { DateField, type DateFieldProps } from './DateField';
import { NumericField, type NumericFieldProps } from './NumericField';
import { OptionsField, type OptionsFieldProps } from './OptionsField';
import { TextField, type TextFieldProps } from './TextField';

import type { BaseFieldComponentProps } from './types';

export type PrimitiveFormFieldProps = BaseFieldComponentProps<Types.PrimitiveFieldValue> & {
  field:
    | Types.BinaryFormField
    | Types.DateFormField
    | Types.NumericFormField
    | Types.OptionsFormField
    | Types.TextFormField;
};

export const PrimitiveFormField = ({ field, ...props }: PrimitiveFormFieldProps) => {
  switch (field.kind) {
    case 'text':
      return <TextField {...field} {...(props as TextFieldProps)} />;
    case 'numeric':
      return <NumericField {...field} {...(props as NumericFieldProps)} />;
    case 'options':
      return <OptionsField {...field} {...(props as OptionsFieldProps)} />;
    case 'date':
      return <DateField {...field} {...(props as DateFieldProps)} />;
    case 'binary':
      return <BinaryField {...field} {...(props as BinaryFieldProps)} />;
  }
};
