'use client';

import React, { useState } from 'react';

import type Types from '@douglasneuroinformatics/form-types';
import { clsx } from 'clsx';
import { set } from 'lodash';
import { useTranslation } from 'react-i18next';
import { ZodError, type ZodType } from 'zod';

import { FormProvider } from '../../context/FormContext';
import { withI18nProvider } from '../../utils/with-i18n-provider';
import { Button } from '../Button/Button';
import { FormFieldsComponent } from './FormFieldsComponent';
import { getDefaultFormValues } from './utils';

import type { FormErrors } from './types';

type FormProps<T extends Types.FormDataType> = {
  className?: string;
  content: Types.FormContent<T>;
  initialValues?: Types.NullableFormDataType<T> | null;
  onSubmit: (data: T) => void;
  resetBtn?: boolean;
  submitBtnLabel?: string;
  validationSchema: ZodType<T>;
};

const FormComponent = <T extends Types.FormDataType>({
  className,
  content,
  initialValues,
  onSubmit,
  resetBtn,
  submitBtnLabel,
  validationSchema
}: FormProps<T>) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [values, setValues] = useState<Types.NullableFormDataType<T>>(
    () => initialValues ?? getDefaultFormValues(content)
  );

  const handleError = (error: ZodError<T>) => {
    const formattedErrors: FormErrors<T> = {};
    for (const issue of error.issues) {
      set(formattedErrors, issue.path, issue.message);
    }
    setErrors(formattedErrors);
  };

  const reset = () => {
    setErrors({});
    setValues(getDefaultFormValues(content));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const result = validationSchema.safeParse(values);
    if (result.success) {
      reset();
      onSubmit(result.data);
    } else {
      handleError(result.error);
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
