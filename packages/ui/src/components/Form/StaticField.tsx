import { ArrayField, type ArrayFieldProps } from './ArrayField';
import { BinaryField, type BinaryFieldProps } from './BinaryField';
import { DateField, type DateFieldProps } from './DateField';
import { NumericField, type NumericFieldProps } from './NumericField';
import { OptionsField, type OptionsFieldProps } from './OptionsField';
import { TextField, type TextFieldProps } from './TextField';

export type StaticFieldProps =
  | ArrayFieldProps
  | BinaryFieldProps
  | DateFieldProps
  | NumericFieldProps
  | OptionsFieldProps
  | TextFieldProps;

export const StaticField = (props: StaticFieldProps) => {
  switch (props.kind) {
    case 'array':
      return <ArrayField {...props} key={props.name} />;
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
