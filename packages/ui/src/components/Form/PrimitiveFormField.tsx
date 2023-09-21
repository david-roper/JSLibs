'use client';

import React from 'react';

import { BinaryField, type BinaryFieldProps } from './BinaryField';
import { DateField, type DateFieldProps } from './DateField';
import { NumericField, type NumericFieldProps } from './NumericField';
import { OptionsField, type OptionsFieldProps } from './OptionsField';
import { TextField, type TextFieldProps } from './TextField';

export type PrimitiveFormFieldProps =
  | TextFieldProps
  | NumericFieldProps
  | OptionsFieldProps
  | DateFieldProps
  | BinaryFieldProps;

export const PrimitiveFormField = (props: PrimitiveFormFieldProps) => {
  switch (props.kind) {
    case 'text':
      return <TextField key={props.name} {...props} />;
    case 'numeric':
      return <NumericField key={props.name} {...props} />;
    case 'options':
      return <OptionsField key={props.name} {...props} />;
    case 'date':
      return <DateField key={props.name} {...props} />;
    case 'binary':
      return <BinaryField key={props.name} {...props} />;
  }
};
