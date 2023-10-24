import type Types from '@douglasneuroinformatics/form-types';

export type FieldError<T extends Types.UnknownNullableFieldValue = Types.UnknownNullableFieldValue> =
  T extends Types.NullableArrayFieldValue
    ? Record<string, string>[]
    : T extends Types.NullablePrimitiveFieldValue
    ? string
    : never;

/** Common props for all field components */
export type BaseFieldComponentProps<T extends Types.UnknownNullableFieldValue = Types.UnknownNullableFieldValue> = {
  error?: FieldError<T>;
  name: string;
  setValue: (value: T | null) => void;
  value: T | null;
};

export type UnknownFieldComponentProps<T extends Types.FormDataType> = BaseFieldComponentProps &
  Types.UnknownFormField<T>;

/** An object mapping field names to error messages, if applicable */
export type FormErrors<T extends Types.FormDataType = Types.FormDataType> = {
  [K in keyof T]?: T[K] extends Types.PrimitiveFieldValue
    ? string
    : T[K] extends Types.ArrayFieldValue
    ? Record<keyof Types.ArrayFieldValue[number], string>[]
    : Record<keyof Types.ArrayFieldValue[number], string>[] | string;
};
