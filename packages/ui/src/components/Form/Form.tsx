import React, { useState } from 'react';

import type Types from '@douglasneuroinformatics/form-types';
import type { PartialFormDataType, PartialNullableFormDataType } from '@douglasneuroinformatics/form-types';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { ZodError, type ZodType } from 'zod';

import { withI18nProvider } from '../../utils/with-i18n-provider';
import { Button } from '../Button/Button';
import { FormErrorMessage } from './FormErrorMessage';
import { FormFieldsComponent } from './FormFieldsComponent';
import { getInitialValues } from './utils';

import type { FormErrors } from './types';

type FormProps<T extends Types.FormDataType> = {
  [key: `data-${string}`]: unknown;
  className?: string;
  content: Types.FormContent<T>;
  id?: string;
  initialValues?: PartialNullableFormDataType<T>;
  onError?: (error: ZodError<T>) => void;
  onSubmit: (data: T) => void;
  resetBtn?: boolean;
  submitBtnLabel?: string;
  validationSchema: ZodType<T>;
};

const FormComponent = <T extends Types.FormDataType>({
  className,
  content,
  id,
  initialValues,
  onError,
  onSubmit,
  resetBtn,
  submitBtnLabel,
  validationSchema,
  ...props
}: FormProps<T>) => {
  const { t } = useTranslation();
  const [rootError, setRootError] = useState<null | string>(null);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [values, setValues] = useState<PartialFormDataType<T>>(initialValues ? getInitialValues(initialValues) : {});

  const handleError = (error: ZodError<T>) => {
    const fieldErrors: FormErrors<T> = {};
    const rootErrors: string[] = [];
    for (const issue of error.issues) {
      if (issue.path.length > 0) {
        _.set(fieldErrors, issue.path, issue.message);
      } else {
        rootErrors.push(issue.message);
      }
    }
    setRootError(rootErrors.join('\n'));
    setErrors(fieldErrors);
    if (onError) {
      onError(error);
    }
  };

  const reset = () => {
    setRootError(null);
    setErrors({});
    setValues({});
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const result = validationSchema.safeParse(values);
    if (result.success) {
      reset();
      onSubmit(result.data);
    } else {
      console.error(result.error.issues);
      handleError(result.error);
    }
  };

  return (
    <form autoComplete="off" className={twMerge('w-full', className)} id={id} onSubmit={handleSubmit} {...props}>
      {Array.isArray(content) ? (
        content.map((fieldGroup, i) => {
          return (
            <div key={i}>
              <div className="my-5">
                <h3 className="mb-2 font-semibold">{fieldGroup.title}</h3>
                {fieldGroup.description && (
                  <small className="text-sm italic text-default">{fieldGroup.description}</small>
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
        {/** Note - aria-label is used for testing in downstream packages */}
        <Button
          aria-label="Submit Button"
          className="block w-full first-letter:capitalize"
          label={submitBtnLabel ?? t('form.submit')}
          type="submit"
          variant="primary"
        />
        {resetBtn && (
          <Button
            aria-label="Reset Button"
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
