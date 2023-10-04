'use client';

import React, { createContext } from 'react';

import type { FormErrors } from '../components/Form/types';
import type { FormInstrumentData, NullableFormInstrumentData } from '@douglasneuroinformatics/form-types';

export type FormState<T extends FormInstrumentData = FormInstrumentData> = {
  errors: FormErrors<T>;
  setValues: React.Dispatch<React.SetStateAction<NullableFormInstrumentData<T>>>;
  values: NullableFormInstrumentData<T>;
};

export const FormContext = createContext<FormState>(null!);

export type FormProviderProps<T extends FormInstrumentData> = {
  children: React.ReactNode;
} & FormState<T>;

export const FormProvider = <T extends FormInstrumentData>({ children, ...props }: FormProviderProps<T>) => {
  return <FormContext.Provider value={props as FormState}>{children}</FormContext.Provider>;
};
