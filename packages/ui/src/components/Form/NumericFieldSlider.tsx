import { useMemo, useRef, useState } from 'react';

//import { range } from '@douglasneuroinformatics/utils';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import _ from 'lodash';
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
  const container = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  const values = useMemo(() => _.range(min, max + 1), [min, max]);

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

  const keyMove = (e) => {
    console.log('key is pressed');
    if (!(guide.current && point.current)) {
      return;
    }
    if (!(document.getElementById("slider-div"))) {
      return;
    }
 

    var slider = document.getElementById("slider-div");
    //slider.style.position = "absolute";


    if(isFocused){
      //move to the right
      if (e.key === 'ArrowRight'){
       console.log('moving right')
       //slider.style.left = (pointRect.left - 10) + 'px';
       handleDrag();

      }
      //move to the left
      else if (e.key === 'ArrowLeft'){
        //slider.style.left = (pointRect.left + 10) + 'px';
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
        <div className={cn("field-input-base flex items-center", isFocused && 'border' )} ref={container} onClick={() => setIsFocused(!isFocused)}>
          <div
            className="h-1.5 focus:border items-center w-full box-content flex pr-2 rounded bg-slate-200 dark:border-slate-600 dark:bg-slate-700 border border-slate-300"
            ref={guide}
          >
            <motion.div
              id="slider-div"
              className="h-5 w-5 rounded-full bg-slate-500 dark:bg-slate-400"
              drag="x"
              dragConstraints={guide}
              dragElastic={false}
              dragMomentum={false}
              ref={point}
              onDrag={handleDrag}
              onKeyDown={keyMove}
              tabIndex={0}
            />
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
