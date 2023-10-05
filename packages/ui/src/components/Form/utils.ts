import type { NullableFormInstrumentData, UnknownFormField } from '@douglasneuroinformatics/form-types';
import type Types from '@douglasneuroinformatics/form-types';

/** Extract a flat array of form fields from the content. This function assumes there are no duplicate keys in groups  */
export function getFormFields<T extends Types.FormInstrumentData>(
  content: Types.FormInstrumentContent<T>
): Types.FormFields<T> {
  if (!Array.isArray(content)) {
    return content;
  }
  return content.reduce((prev, current) => ({ ...prev, ...current.fields }), content[0]!.fields) as Types.FormFields<T>;
}

export function getDefaultFormValuesForArrayField(field: Types.ArrayFormField): Types.NullableArrayFieldValue {
  const values: Types.NullableArrayFieldValue[number] = {};
  for (const subfieldName in field.fieldset) {
    values[subfieldName] = null;
  }
  return [values];
}

/** Returns the default values when initializing the state or resetting the form */
export const getDefaultFormValues = <T extends Types.FormInstrumentData>(
  content: Types.FormInstrumentContent<T>
): Types.NullableFormInstrumentData<T> => {
  const defaultValues: NullableFormInstrumentData = {};

  // Get a flat array of all fields regardless of the content type
  const fields = getFormFields(content);
  for (const fieldName in fields) {
    const field = fields[fieldName] as UnknownFormField<T>;
    const staticField = field instanceof Function ? field(null) : field;
    if (!staticField) {
      defaultValues[fieldName] = null;
    } else if (staticField.kind === 'array') {
      defaultValues[fieldName] = getDefaultFormValuesForArrayField(staticField);
    } else {
      defaultValues[fieldName] = null;
    }
  }
  return defaultValues as Types.NullableFormInstrumentData<T>;
};

export function formatFormDataAsString<T extends Types.FormInstrumentData>(data: T) {
  const lines: string[] = [];
  for (const key in data) {
    const value: Types.ArrayFieldValue | Types.PrimitiveFieldValue = data[key]!;
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const record = value[i]!;
        for (const prop in record) {
          lines.push(`${prop} (${i + 1}): ${record[prop]}`);
        }
      }
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  return lines.join('\n') + '\n';
}
