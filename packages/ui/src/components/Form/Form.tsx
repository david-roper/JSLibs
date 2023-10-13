'use client';

import React, { useMemo, useState } from 'react';

import type { FormErrors } from './types';
import type Types from '@douglasneuroinformatics/form-types';
import type { ErrorObject, JSONSchemaType } from 'ajv';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

import { FormProvider } from '../../context/FormContext';
import { ajv } from '../../services/ajv';
import { withI18nProvider } from '../../utils/with-i18n-provider';
import { Button } from '../Button/Button';
import { FormFieldsComponent } from './FormFieldsComponent';
import { getDefaultFormValues } from './utils';

/** Custom error messages to be supplied for each field */
type ErrorMessages<T extends Types.FormInstrumentData> = {
  [K in keyof T]?: T[K] extends Types.PrimitiveFieldValue
    ? string
    : T[K] extends Types.ArrayFieldValue
    ? {
        [P in keyof T[K][number]]?: string;
      }
    : never;
};

type FormProps<T extends Types.FormInstrumentData> = {
  className?: string;
  content: Types.FormContent<T>;
  errorMessages?: ErrorMessages<T> | string;
  initialValues?: Types.NullableFormInstrumentData<T> | null;
  onSubmit: (data: T) => void;
  resetBtn?: boolean;
  submitBtnLabel?: string;
  validationSchema?: JSONSchemaType<T>;
};

const FormComponent = <T extends Types.FormInstrumentData>({
  className,
  content,
  errorMessages,
  initialValues,
  onSubmit,
  resetBtn,
  submitBtnLabel,
  validationSchema
}: FormProps<T>) => {
  const [validationErrors, setValidationErrors] = useState<ErrorObject[] | null>(null);
  const [values, setValues] = useState<Types.NullableFormInstrumentData<T>>(
    () => initialValues ?? getDefaultFormValues(content)
  );

  const { i18n, t } = useTranslation();

  const errors: FormErrors<T> = useMemo(() => {
    const formErrors: FormErrors<T> = {};
    if (!validationErrors) {
      return formErrors;
    }

    const getErrorMessage = (error: ErrorObject, path: string[]): string => {
      const defaultMessage = `${error.message ?? t('form.errors.unknown')}`;
      const [k1, k2]: [string?, string?] = [path[0], path[2]];
      if (typeof errorMessages === 'string') {
        return errorMessages;
      } else if (typeof errorMessages?.[k1!] === 'string') {
        return errorMessages[k1!] as string;
      } else if (errorMessages?.[k1!] instanceof Object) {
        return (errorMessages[k1!] as Record<string, string | undefined>)[k2!] ?? defaultMessage;
      }
      return defaultMessage;
    };

    for (const error of validationErrors) {
      const path = error.instancePath.split('/').filter((e) => e);
      const baseField = path[0] as Extract<keyof T, string>;
      const isPrimitiveField = path.length === 1;
      if (isPrimitiveField) {
        (formErrors[baseField] as string) = getErrorMessage(error, path);
        continue;
      }
      if (!Array.isArray(formErrors[baseField])) {
        (formErrors[baseField] as Record<string, string>[]) = [];
      }
      const arrayErrors = formErrors[baseField] as Record<string, string>[];
      const [index, item] = [parseInt(path[1]!), path[2]];
      if (!arrayErrors[index]) {
        arrayErrors[index] = {};
      }
      arrayErrors[index]![item!] = getErrorMessage(error, path);
    }
    return formErrors;
  }, [validationErrors, i18n.resolvedLanguage]);

  const reset = () => {
    setValues(getDefaultFormValues(content));
    setValidationErrors(null);
  };

  const validate = useMemo(
    () =>
      ajv.compile(
        validationSchema ?? {
          required: [],
          type: 'object'
        }
      ),
    [validationSchema]
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const valid = validate(values);
    if (valid) {
      reset();
      onSubmit(values as T);
    } else {
      console.error(validate.errors);
      setValidationErrors(validate.errors ?? null);
    }
  };

  return (
    <FormProvider {...{ errors, setValues, values }}>
      <form autoComplete="off" className={clsx('w-full', className)} onSubmit={handleSubmit}>
        {Array.isArray(content) ? (
          content.map((fieldGroup, i) => {
            return (
              <div key={i}>
                <div className="my-5">
                  <h3 className="mb-2 font-semibold">{fieldGroup.title}</h3>
                  {fieldGroup.description && (
                    <small className="text-sm italic text-slate-600 dark:text-slate-300">
                      {fieldGroup.description}
                    </small>
                  )}
                </div>
                <FormFieldsComponent fields={fieldGroup.fields as Types.FormFields<T>} />
              </div>
            );
          })
        ) : (
          <FormFieldsComponent fields={content} />
        )}
        <div className="flex w-full gap-3">
          <Button
            className="block w-full first-letter:capitalize"
            label={submitBtnLabel ?? t('form.submit')}
            type="submit"
            variant="primary"
          />
          {resetBtn && (
            <Button
              className="block w-full first-letter:capitalize"
              label={t('form.reset')}
              type="button"
              variant="secondary"
              onClick={reset}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};

const Form = withI18nProvider(FormComponent) as typeof FormComponent;

export { Form, type FormProps };
