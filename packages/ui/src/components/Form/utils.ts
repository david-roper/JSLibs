import type { NullableFormInstrumentData, UnknownFormField } from '@douglasneuroinformatics/form-types';
import type Types from '@douglasneuroinformatics/form-types';

/** Extract a flat array of form fields from the content. This function assumes there are no duplicate keys in groups  */
function getFormFields<T extends Types.FormInstrumentData>(
  content: Types.FormInstrumentContent<T>
): Types.FormFields<T> {
  if (!Array.isArray(content)) {
    return content;
  }
  return content.reduce((prev, current) => ({ ...prev, ...current.fields }), content[0]!.fields) as Types.FormFields<T>;
}

function getDefaultValuesForArrayField(field: Types.ArrayFormField): Types.NullableArrayFieldValue {
  const values: Types.NullableArrayFieldValue[number] = {};
  for (const subfieldName in field.fieldset) {
    values[subfieldName] = null;
  }
  return [values];
}

/** Returns the default values when initializing the state or resetting the form */
export const getDefaultValues = <T extends Types.FormInstrumentData>(
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
      defaultValues[fieldName] = getDefaultValuesForArrayField(staticField);
    } else {
      defaultValues[fieldName] = null;
    }
  }
  return defaultValues as Types.NullableFormInstrumentData<T>;
};
