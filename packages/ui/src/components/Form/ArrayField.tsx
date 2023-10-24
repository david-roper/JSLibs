'use client';

import { useEffect } from 'react';

import type Types from '@douglasneuroinformatics/form-types';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button/Button';
import { PrimitiveFormField, type PrimitiveFormFieldProps } from './PrimitiveFormField';

import type { BaseFieldComponentProps } from './types';

export type ArrayFieldProps = BaseFieldComponentProps<Types.NullableArrayFieldValue> & Types.ArrayFormField;

export const ArrayField = ({ error, fieldset, label, setValue: setArrayValue, value: arrayValue }: ArrayFieldProps) => {
  const { t } = useTranslation();

  const createNewFieldset = () => Object.fromEntries(Object.keys(fieldset).map((fieldName) => [fieldName, null]));

  useEffect(() => {
    if (!arrayValue) {
      setArrayValue([createNewFieldset()]);
    }
  }, []);

  if (!arrayValue) {
    return null;
  }

  // Creates a new object with all values mapped to null and appends it to the previous arrayValue
  const appendField = () => {
    setArrayValue([...arrayValue, createNewFieldset()]);
  };

  const removeField = () => {
    if (arrayValue.length > 1) {
      arrayValue.pop();
      setArrayValue(arrayValue);
    }
  };

  return (
    <div>
      {arrayValue.map((fields, i) => (
        <div key={i}>
          <span className="font-medium text-slate-600 dark:text-slate-300">{label + ' ' + (i + 1)}</span>
          {Object.keys(fields).map((fieldName) => {
            const field = fieldset[fieldName];
            const fieldProps = typeof field === 'function' ? field(fields) : field;
            if (!fieldProps) {
              return null;
            }
            const props = {
              error: error?.[i]?.[fieldName],
              name: fieldName + i,
              setValue: (value: Types.NullablePrimitiveFieldValue) => {
                const newArrayValue = [...arrayValue];
                newArrayValue[i]![fieldName] = value;
                setArrayValue(newArrayValue);
              },
              value: fields[fieldName],
              ...fieldProps
            } as PrimitiveFormFieldProps;
            return <PrimitiveFormField {...props} key={fieldName} />;
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
