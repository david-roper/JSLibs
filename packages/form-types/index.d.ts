import type { Simplify } from 'type-fest';

/** Discriminator key to determine the structure of a specific form field */
export type FormFieldKind = 'text' | 'numeric' | 'options' | 'date' | 'binary' | 'array';

/** The type of the data associated with a primitive field */
export type PrimitiveFieldValue = string | number | boolean;

export type NullablePrimitiveFieldValue<T extends PrimitiveFieldValue = PrimitiveFieldValue> = T | null;

/** The type of the data associated with an array field */
export type ArrayFieldValue = Record<string, PrimitiveFieldValue>[];

export type NullableArrayFieldValue<T extends ArrayFieldValue = ArrayFieldValue> = {
  [K in keyof T[number]]: NullablePrimitiveFieldValue<T[number][K]>;
}[];

export type UnknownNullableFieldValue = NullablePrimitiveFieldValue | NullableArrayFieldValue;

/** The type of the data associated with the entire instrument (i.e., the values for all fields) */
export type FormInstrumentData = Record<string, PrimitiveFieldValue | ArrayFieldValue>;

export type NullableFormInstrumentData<T extends FormInstrumentData = FormInstrumentData> = {
  [K in keyof T]: T[K] extends PrimitiveFieldValue
    ? NullablePrimitiveFieldValue<T[K]>
    : T[K] extends ArrayFieldValue
    ? NullableArrayFieldValue<T[K]>
    : T[K] extends PrimitiveFieldValue | ArrayFieldValue
    ? NullablePrimitiveFieldValue | NullableArrayFieldValue
    : never;
};

/** The basic properties common to all field kinds */
export type BaseFormField = {
  kind: FormFieldKind;

  /** The label to be displayed to the user */
  label: string;

  /** An optional description of this field */
  description?: string;

  /** Whether or not the field is required */
  isRequired?: boolean;
};

/**
 * A helper type used to merge `BaseFormField` with `T`, where kind determines
 * the data type stored in the form and variant determines what will be rendered
 * to the user, if applicable
 */
export type FormFieldMixin<T extends { kind: FormFieldKind }> = Simplify<BaseFormField & T>;

export type TextFormField = FormFieldMixin<{
  kind: 'text';
  variant: 'short' | 'long' | 'password';
}>;

export type NumericFormField = FormFieldMixin<{
  kind: 'numeric';
  min: number;
  max: number;
  variant: 'default' | 'slider';
}>;

/**
 * Here, TValue is a string and options is a map of the actual values (i.e., what will be sent to backend)
 * to the labels. Thus, only one key will be sent to the backend.
 */
export type OptionsFormField<TValue extends string = string> = FormFieldMixin<{
  kind: 'options';
  options: Record<TValue, string>;
}>;

export type DateFormField = FormFieldMixin<{
  kind: 'date';
}>;

export type BinaryFormField = FormFieldMixin<
  | {
      kind: 'binary';
      variant: 'checkbox';
    }
  | {
      kind: 'binary';
      variant: 'radio';
      options?: {
        t: string;
        f: string;
      };
    }
>;

/** A field where the underlying value of the field data is of type FormFieldValue */
export type PrimitiveFormField<TValue extends PrimitiveFieldValue = PrimitiveFieldValue> = TValue extends string
  ? TextFormField | OptionsFormField<TValue> | DateFormField
  : TValue extends number
  ? NumericFormField
  : TValue extends boolean
  ? BinaryFormField
  : never;

export type ArrayFieldset<T extends ArrayFieldValue[number]> = {
  [K in keyof T]: PrimitiveFormField<T[K]>;
};

export type ArrayFormField<TValue extends ArrayFieldValue = ArrayFieldValue> = FormFieldMixin<{
  kind: 'array';
  fieldset: ArrayFieldset<TValue[number]>;
}>;

export type StaticFormField<TValue extends ArrayFieldValue | PrimitiveFieldValue> = [TValue] extends [
  PrimitiveFieldValue
]
  ? PrimitiveFormField<TValue>
  : [TValue] extends [ArrayFieldValue]
  ? ArrayFormField<TValue>
  : PrimitiveFormField | ArrayFormField;

export type DynamicFormField<TData extends FormInstrumentData, TValue extends ArrayFieldValue | PrimitiveFieldValue> = (
  data: NullableFormInstrumentData<TData> | null
) => StaticFormField<TValue> | null;

export type UnknownFormField<TData extends FormInstrumentData, TKey extends keyof TData = keyof TData> =
  | StaticFormField<TData[TKey]>
  | DynamicFormField<TData, TData[TKey]>;

export type FormFields<TData extends FormInstrumentData = FormInstrumentData> = {
  [K in keyof TData]: UnknownFormField<TData, K>;
};

export type FormFieldsGroup<TData extends FormInstrumentData = FormInstrumentData> = {
  title: string;
  description?: string;
  fields: {
    [K in keyof TData]?: UnknownFormField<TData, K>;
  };
};

export type FormInstrumentContent<TData extends FormInstrumentData = FormInstrumentData> =
  | FormFields<TData>
  | FormFieldsGroup<TData>[];
