import type { NumericFormField } from '@douglasneuroinformatics/form-types';

import { BallSlider } from './BallSlider';
import { NumericFieldDefault } from './NumericFieldDefault';
import { NumericFieldSlider } from './NumericFieldSlider';
import { shadSlider } from './shadSlider';
import { type BaseFieldComponentProps } from './types';

export type NumericFieldProps = BaseFieldComponentProps<number> & NumericFormField;

export const NumericField = (props: NumericFieldProps) => {
  switch (props.variant) {
    case 'default':
      return <NumericFieldDefault {...props} />;
    case 'slider':
      return <NumericFieldSlider {...props} />;
    case 'ballslider':
      return <BallSlider {...props} />;
    case 'shadslider':
      return <shadSlider {...props} />;
  }
};
