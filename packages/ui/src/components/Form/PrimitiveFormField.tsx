'use client';

import React from 'react';

import { BinaryField, BinaryFieldProps } from './BinaryField.js';
import { DateField, DateFieldProps } from './DateField.js';
import { NumericField, NumericFieldProps } from './NumericField.js';
import { OptionsField, OptionsFieldProps } from './OptionsField.js';
import { TextField, TextFieldProps } from './TextField.js';

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
