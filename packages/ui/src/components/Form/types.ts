import type {
  ArrayFieldValue,
  FormInstrumentData,
  NullableArrayFieldValue,
  NullablePrimitiveFieldValue,
  PrimitiveFieldValue
} from '@douglasneuroinformatics/form-types';

/** Common props for all field components */
export type BaseFieldProps<T> = {
  name: string;
  value: T;
  setValue: (value: T) => void;
  error?: T extends NullableArrayFieldValue
    ? Record<string, string>[]
    : T extends NullablePrimitiveFieldValue
    ? string
    : never;
};

/** An object mapping field names to error messages, if applicable */
export type FormErrors<T extends FormInstrumentData = FormInstrumentData> = {
  [K in keyof T]?: T[K] extends PrimitiveFieldValue
    ? string
    : T[K] extends ArrayFieldValue
    ? Record<keyof ArrayFieldValue[number], string>[]
    : never;
};

export type FormValues<T extends FormInstrumentData = FormInstrumentData> = {
  [K in keyof T]: T[K] extends PrimitiveFieldValue
    ? NullablePrimitiveFieldValue<T[K]>
    : T[K] extends ArrayFieldValue
    ? NullableArrayFieldValue<T[K]>
    : T[K] extends PrimitiveFieldValue | ArrayFieldValue
    ? NullablePrimitiveFieldValue | NullableArrayFieldValue
    : never;
};
