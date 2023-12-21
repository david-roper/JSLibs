import { useEffect, useMemo, useRef, useState } from 'react';

//import { range } from '@douglasneuroinformatics/utils';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import type { Simplify } from 'type-fest';

import { PopoverIcon, cn } from '../..';
import { FormFieldContainer } from './FormFieldContainer';

import type { NumericFieldProps } from './NumericField';

export type NewSliderProps = Simplify<Extract<NumericFieldProps, { variant: 'slider' }>>;

export const NewSlider = ({ description, error, label, max, min, name, setValue, value }: NewSliderProps) => {
  return (
    <FormFieldContainer error={error}>
      <label className="field-label" htmlFor={name}>
        {label}
      </label>
      <div className="flex gap-3">
        {description && (
          <div className="flex items-center justify-center">
            <PopoverIcon icon={QuestionMarkCircleIcon} position="right" text={description} />
          </div>
        )}
      </div>
    </FormFieldContainer>
  );
};
