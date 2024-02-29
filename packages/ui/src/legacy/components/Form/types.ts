import type Types from '@douglasneuroinformatics/form-types';

export type FieldError<T extends Types.FormFieldValue = Types.FormFieldValue> =
  T extends NonNullable<Types.ArrayFieldValue>
    ? Record<string, string>[]
    : T extends NonNullable<Types.PrimitiveFieldValue>
      ? string
      : never;

/** Common props for all field components */
export type BaseFieldComponentProps<T extends Types.FormFieldValue = Types.FormFieldValue> = {
  error?: FieldError<T>;
  name: string;
  setError: (error: FieldError<T>) => void;
  setValue: (value: T | undefined) => void;
  value: T | undefined;
};

/** An object mapping field names to error messages, if applicable */
export type FormErrors<T extends Types.FormDataType = Types.FormDataType> = {
  [K in keyof T]?: T[K] extends NonNullable<Types.PrimitiveFieldValue>
    ? string
    : T[K] extends NonNullable<Types.PrimitiveFieldValue>
      ? Record<string, string>[]
      : never;
};
