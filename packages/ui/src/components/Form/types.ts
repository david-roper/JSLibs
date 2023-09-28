import type {
  ArrayFieldValue,
  FormInstrumentData,
  NullableArrayFieldValue,
  NullablePrimitiveFieldValue,
  PrimitiveFieldValue,
  UnknownFormField,
  UnknownNullableFieldValue
} from '@douglasneuroinformatics/form-types';

/** Common props for all field components */
export type BaseFieldComponentProps<T extends UnknownNullableFieldValue = UnknownNullableFieldValue> = {
  name: string;
  value: T;
  setValue: (value: T) => void;
  error?: T extends NullableArrayFieldValue
    ? Record<string, string>[]
    : T extends NullablePrimitiveFieldValue
    ? string
    : never;
};

export type UnknownFieldComponentProps<T extends FormInstrumentData> = BaseFieldComponentProps & UnknownFormField<T>;

/** An object mapping field names to error messages, if applicable */
export type FormErrors<T extends FormInstrumentData = FormInstrumentData> = {
  [K in keyof T]?: T[K] extends PrimitiveFieldValue
    ? string
    : T[K] extends ArrayFieldValue
    ? Record<keyof ArrayFieldValue[number], string>[]
    : never;
};
