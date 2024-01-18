import { useMemo, useRef, useState } from 'react';

import { range } from '@douglasneuroinformatics/utils';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import type { Simplify } from 'type-fest';

import { PopoverIcon, cn } from '../..';
import { FormFieldContainer } from './FormFieldContainer';

import type { NumericFieldProps } from './NumericField';

export type NumericFieldSliderProps = Simplify<Extract<NumericFieldProps, { variant: 'slider' }>>;

export const NumericFieldSlider = ({
  description,
  error,
  label,
  max,
  min,
  name,
  setValue,
  value
}: NumericFieldSliderProps) => {
  const guide = useRef<HTMLDivElement>(null);
  const point = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const values = useMemo(() => range(min, max + 1), [min, max]);

  const handleDrag = () => {
    if (!(guide.current && point.current)) {
      return;
    }
    const guideRect = guide.current.getBoundingClientRect();
    const pointRect = point.current.getBoundingClientRect();
    const offsetLeft = pointRect.left - guideRect.left;
    const offsetPercentage = offsetLeft / (guideRect.width - pointRect.width);
    const valueIndex = Math.round((values.length - 1) * offsetPercentage);
    setValue(values[valueIndex] ?? undefined);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!(guide.current && point.current) || !isFocused) {
      return;
    }

    const pointRect = point.current.getBoundingClientRect();
    const guideRect = guide.current.getBoundingClientRect();

    //move to the right
    if (e.key === 'ArrowRight') {
      if (guideRect.right > pointRect.right + 10) {
        //point.current.clientLeft = pointRect.left + 10;

        point.current.style.transform = 'translateX(' + (pointRect.left + 10) + 'px)';
        handleDrag();
      } else {
        point.current.style.transform = 'translateX(' + 0 + 'px)';
        handleDrag();
      }
    }
    //move to the left
    else if (e.key === 'ArrowLeft') {
      let newPos = pointRect.left - 40;
      if (newPos > guideRect.left) {
        point.current.style.transform = 'translateX(' + newPos + 'px)';
        handleDrag();
      } else {
        point.current.style.transform = 'translateX(' + (guideRect.right - pointRect.right) + 'px)';
        handleDrag();
      }
    }
  };

  return (
    <FormFieldContainer error={error}>
      <label className="field-label" htmlFor={name}>
        {label}
      </label>
      <div className="flex gap-3">
        <div
          className={cn('field-input-base flex items-center', isFocused && 'border')}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          onClick={() => setIsFocused(!isFocused)}
          onKeyDown={handleKeyDown}
        >
          <div
            className="h-1.5 items-center w-full box-content flex pr-2 rounded bg-slate-200 dark:border-slate-600 dark:bg-slate-700 border border-slate-300"
            ref={guide}
          >
            <div
              className="h-5 w-5 rounded-full bg-slate-500 dark:bg-slate-400"
              draggable={true}
              id="slider-div"
              ref={point}
              onDrag={handleDrag}
            ></div>
          </div>
        </div>
        <div className="flex items-center justify-center text-slate-600 dark:text-slate-300">{value ?? 'NA'}</div>
        {description && (
          <div className="flex items-center justify-center">
            <PopoverIcon icon={QuestionMarkCircleIcon} position="right" text={description} />
          </div>
        )}
      </div>
    </FormFieldContainer>
  );
};
