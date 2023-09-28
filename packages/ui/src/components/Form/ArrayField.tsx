'use client';

import type {
  ArrayFormField,
  NullableArrayFieldValue,
  NullablePrimitiveFieldValue
} from '@douglasneuroinformatics/form-types';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button/Button';

import { PrimitiveFormField, type PrimitiveFormFieldProps } from './PrimitiveFormField';
import type { BaseFieldProps } from './types';

export type ArrayFieldProps = BaseFieldProps<NullableArrayFieldValue> & ArrayFormField;

export const ArrayField = ({ label, fieldset, error, value: arrayValue, setValue: setArrayValue }: ArrayFieldProps) => {
  const { t } = useTranslation();

  // Creates a new object with all values mapped to null and appends it to the previous arrayValue
  const appendField = () => {
    setArrayValue([...arrayValue, Object.fromEntries(Object.keys(fieldset).map((fieldName) => [fieldName, null]))]);
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
            const fieldProps = field instanceof Function ? field(fields) : field;
            if (!fieldProps) {
              return null;
            }
            const props = {
              name: fieldName + i,
              error: error?.[i]?.[fieldName],
              value: fields[fieldName],
              setValue: (value: NullablePrimitiveFieldValue) => {
                const newArrayValue = [...arrayValue];
                newArrayValue[i]![fieldName] = value;
                setArrayValue(newArrayValue);
              },
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
