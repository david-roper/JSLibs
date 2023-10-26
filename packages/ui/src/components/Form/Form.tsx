'use client';

import React, { useState } from 'react';

import type Types from '@douglasneuroinformatics/form-types';
import { clsx } from 'clsx';
import { merge } from 'lodash';
import { set } from 'lodash';
import { useTranslation } from 'react-i18next';
import type { PartialDeep } from 'type-fest';
import { ZodError, type ZodType } from 'zod';

import { withI18nProvider } from '../../utils/with-i18n-provider';
import { Button } from '../Button/Button';
import { FormErrorMessage } from './FormErrorMessage';
import { FormFieldsComponent } from './FormFieldsComponent';
import { deepPrune, getDefaultFormValues } from './utils';

import type { FormErrors } from './types';

type FormProps<T extends Types.FormDataType> = {
  className?: string;
  content: Types.FormContent<T>;
  initialValues?: PartialDeep<Types.NullableFormDataType<T>> | null;
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
  const [rootError, setRootError] = useState<null | string>(null);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [values, setValues] = useState<Types.NullableFormDataType<T>>(() => {
    const defaultValues = getDefaultFormValues(content);
    if (!initialValues) {
      return defaultValues;
    }
    return merge(defaultValues, initialValues);
  });

  const handleError = (error: ZodError<T>) => {
    const fieldErrors: FormErrors<T> = {};
    const rootErrors: string[] = [];
    for (const issue of error.issues) {
      if (issue.path.length > 0) {
        set(fieldErrors, issue.path, issue.message);
      } else {
        rootErrors.push(issue.message);
      }
    }
    setRootError(rootErrors.join('\n'));
    setErrors(fieldErrors);
  };

  const reset = () => {
    setRootError(null);
    setErrors({});
    setValues(getDefaultFormValues(content));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const result = validationSchema.safeParse(deepPrune(values));
    if (result.success) {
      reset();
      onSubmit(result.data);
    } else {
      console.error(result.error.issues);
      handleError(result.error);
    }
  };

  return (
    <form autoComplete="off" className={clsx('w-full', className)} onSubmit={handleSubmit}>
      {Array.isArray(content) ? (
        content.map((fieldGroup, i) => {
          return (
            <div key={i}>
              <div className="my-5">
                <h3 className="mb-2 font-semibold">{fieldGroup.title}</h3>
                {fieldGroup.description && (
                  <small className="text-sm italic text-slate-600 dark:text-slate-300">{fieldGroup.description}</small>
                )}
              </div>
              <FormFieldsComponent
                errors={errors}
                fields={fieldGroup.fields as Types.FormFields<T>}
                setErrors={setErrors}
                setValues={setValues}
                values={values}
              />
            </div>
          );
        })
      ) : (
        <FormFieldsComponent
          errors={errors}
          fields={content}
          setErrors={setErrors}
          setValues={setValues}
          values={values}
        />
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
      {rootError && <FormErrorMessage message={rootError} />}
    </form>
  );
};

const Form = withI18nProvider(FormComponent) as typeof FormComponent;

export { Form, type FormProps };
