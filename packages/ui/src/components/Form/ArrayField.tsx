'use client';

import { useEffect } from 'react';

import type Types from '@douglasneuroinformatics/form-types';
import { useTranslation } from 'react-i18next';

import { useFormField } from '../../hooks/useFormField';
import { Button } from '../Button/Button';
import { PrimitiveFormField } from './PrimitiveFormField';

import type { BaseFieldComponentProps } from './types';

export type ArrayFieldProps = BaseFieldComponentProps & Types.ArrayFormField;

export const ArrayField = ({ fieldset, label, path }: ArrayFieldProps) => {
  const { t } = useTranslation();
  const { setValue, value } = useFormField<Types.NullableArrayFieldValue>(path);

  const createNewFieldset = () => Object.fromEntries(Object.keys(fieldset).map((fieldName) => [fieldName, null]));

  useEffect(() => {
    if (!value) {
      setValue([createNewFieldset()]);
    }
  }, []);

  if (!value) {
    return null;
  }

  // Creates a new object with all values mapped to null and appends it to the previous arrayValue
  const appendField = () => {
    setValue([...value, createNewFieldset()]);
  };

  const removeField = () => {
    if (value.length > 1) {
      value.pop();
      setValue(value);
    }
  };

  return (
    <div>
      {value.map((fields, i) => (
        <div key={i}>
          <span className="font-medium text-slate-600 dark:text-slate-300">{label + ' ' + (i + 1)}</span>
          {Object.keys(fields).map((fieldName) => {
            const field = fieldset[fieldName];
            const fieldProps = typeof field === 'function' ? field(fields) : field;
            if (!fieldProps) {
              return null;
            }
            return (
              <PrimitiveFormField
                name={fieldName}
                path={[...path, i.toString(), fieldName]}
                {...fieldProps}
                key={fieldName}
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
};
