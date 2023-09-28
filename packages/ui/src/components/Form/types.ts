import type Types from '@douglasneuroinformatics/form-types';

/** Common props for all field components */
export type BaseFieldComponentProps<T extends Types.UnknownNullableFieldValue = Types.UnknownNullableFieldValue> = {
  name: string;
  value: T | null;
  setValue: (value: T | null) => void;
  error?: T extends Types.NullableArrayFieldValue
    ? Record<string, string>[]
    : T extends Types.NullablePrimitiveFieldValue
    ? string
    : never;
};

export type UnknownFieldComponentProps<T extends Types.FormInstrumentData> = BaseFieldComponentProps & Types.UnknownFormField<T>;

/** An object mapping field names to error messages, if applicable */
export type FormErrors<T extends Types.FormInstrumentData = Types.FormInstrumentData> = {
  [K in keyof T]?: T[K] extends Types.PrimitiveFieldValue
    ? string
    : T[K] extends Types.ArrayFieldValue
    ? Record<keyof Types.ArrayFieldValue[number], string>[]
    : never;
};
