import { memo, useEffect } from 'react';

import type Types from '@douglasneuroinformatics/form-types';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button/Button';
import { PrimitiveFormField } from './PrimitiveFormField';

import type { BaseFieldComponentProps } from './types';

export type ArrayFieldProps = BaseFieldComponentProps<Types.NullableArrayFieldValue> & Types.ArrayFormField;

export const ArrayField = memo(function ArrayField({
  error: arrayError,
  fieldset,
  label,
  setError: setArrayError,
  setValue: setArrayValue,
  value: arrayValue
}: ArrayFieldProps) {
  const { t } = useTranslation();

  const createNewFieldset = () => Object.fromEntries(Object.keys(fieldset).map((fieldName) => [fieldName, null]));

  useEffect(() => {
    setArrayValue([createNewFieldset()]);
  }, [fieldset]);

  if (!arrayValue) {
    return null;
  }

  // Creates a new object with all values mapped to null and appends it to the previous arrayValue
  const appendField = () => {
    setArrayValue([...arrayValue, createNewFieldset()]);
  };

  const removeField = () => {
    if (arrayValue.length > 1) {
      setArrayValue(arrayValue.slice(0, arrayValue.length - 1));
    }
  };

  return (
    <div>
      {arrayValue.map((fields, i) => (
        <div key={i}>
          <span className="font-medium text-slate-600 dark:text-slate-300">{label + ' ' + (i + 1)}</span>
          {Object.keys(fields).map((name) => {
            const field = fieldset[name];
            const fieldProps = field?.kind === 'dynamic-fieldset' ? field.render(fields) : field;
            if (!fieldProps) {
              return null;
            }
            return (
              <PrimitiveFormField
                error={arrayError?.[i]?.[name]}
                field={fieldProps}
                key={name}
                name={name}
                setError={(error) => {
                  const newArrayError = arrayError ? [...arrayError] : [];
                  if (!newArrayError[i]) {
                    newArrayError[i] = {};
                  }
                  newArrayError[i]![name] = error;
                  setArrayError(newArrayError);
                }}
                setValue={(value) => {
                  const newArrayValue = [...arrayValue];
                  newArrayValue[i]![name] = value;
                  setArrayValue(newArrayValue);
                }}
                value={arrayValue?.[i]?.[name] ?? null}
              />
            );
          })}
        </div>
      ))}
      <div className="mb-5 flex gap-5">
        <Button label={t('form.append')} type="button" onClick={appendField} />
        <Button label={t('form.remove')} type="button" variant="secondary" onClick={removeField} />
      </div>
    </div>
  );
});
