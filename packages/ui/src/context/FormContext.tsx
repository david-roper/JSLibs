'use client';

import React, { createContext } from 'react';

import type { FormDataType, NullableFormDataType } from '@douglasneuroinformatics/form-types';

import type { FormErrors } from '../components/Form/types';

export type FormState<T extends FormDataType = FormDataType> = {
  errors: FormErrors<T>;
  setValues: React.Dispatch<React.SetStateAction<NullableFormDataType<T>>>;
  values: NullableFormDataType<T>;
};

export const FormContext = createContext<FormState>(null!);

export type FormProviderProps<T extends FormDataType> = {
  children: React.ReactNode;
} & FormState<T>;

export const FormProvider = <T extends FormDataType>({ children, ...props }: FormProviderProps<T>) => {
  return <FormContext.Provider value={props as FormState}>{children}</FormContext.Provider>;
};
