'use client';

import type { NumericFormField } from '@douglasneuroinformatics/form-types';

import { NumericFieldDefault } from './NumericFieldDefault';
import { NumericFieldSlider } from './NumericFieldSlider';
import { type BaseFieldComponentProps } from './types';

export type NumericFieldProps = BaseFieldComponentProps<number> & NumericFormField;

export const NumericField = (props: NumericFieldProps) => {
  switch (props.variant) {
    case 'default':
      return <NumericFieldDefault {...props} />;
    case 'slider':
      return <NumericFieldSlider {...props} />;
  }
};
