import type Types from '@douglasneuroinformatics/form-types';

export function getInitialValues<T extends Types.FormDataType>(values: Types.PartialNullableFormDataType<T>) {
  const initialValues: Record<string, unknown> = {};
  for (const key in values) {
    const value = values[key];
    if (value === null || value === undefined) {
      continue;
    } else if (Array.isArray(value)) {
      initialValues[key] = value.map(getInitialValues);
    } else {
      initialValues[key] = value;
    }
  }
  return initialValues as Types.PartialFormDataType<T>;
}

/** Extract a flat array of form fields from the content. This function assumes there are no duplicate keys in groups  */
export function getFormFields<T extends Types.FormDataType>(content: Types.FormContent<T>): Types.FormFields<T> {
  if (!Array.isArray(content)) {
    return content;
  }
  return content.reduce((prev, current) => ({ ...prev, ...current.fields }), content[0]!.fields) as Types.FormFields<T>;
}

export function formatFormDataAsString<T extends Types.FormDataType>(data: T) {
  const lines: string[] = [];
  for (const key in data) {
    const value = data[key]!;
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const record = value[i]!;
        for (const prop in record) {
          lines.push(`${prop} (${i + 1}): ${record[prop]?.toString()}`);
        }
      }
    } else {
      lines.push(`${key}: ${value.toString()}`);
    }
  }
  return lines.join('\n') + '\n';
}

/**
 * Given a set of data, resolve static content for form fields. Null values
 * will be removed.
 */
export function resolveStaticFormFields<T extends Types.FormDataType>(
  content: Types.FormContent<T>,
  data: Types.PartialFormDataType<T>
) {
  const staticFormFields: Partial<Types.StaticFormFields<T>> = {};
  const formFields = getFormFields(content);
  for (const fieldName in formFields) {
    const field: Types.UnknownFormField<T, typeof fieldName> = formFields[fieldName];
    if (field.kind === 'dynamic') {
      const resolvedField = field.render(data);
      if (resolvedField) {
        staticFormFields[fieldName] = resolvedField;
      }
    } else {
      staticFormFields[fieldName] = field;
    }
  }
  return staticFormFields;
}
