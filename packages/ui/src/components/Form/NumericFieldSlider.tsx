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
    if (!(guide.current && point.current)) {
      return;
    }
    if (!(document.getElementById("slider-div"))) {
      return;
    }
    const pointRect = point.current.getBoundingClientRect();
    const guideRect = guide.current.getBoundingClientRect();

    var slider = document.getElementById("slider-div");
    //slider.style.position = "absolute";
    

    if(isFocused){
      console.log('guideRect right pos: ' + guideRect.right)
      console.log('guideRect left pos: ' + guideRect.left)
      console.log('pointRect left pos: ' + pointRect.left)
      //move to the right
      if (e.key === 'ArrowRight'){
      console.log('right key')
       if(guideRect.right > (pointRect.right + 10)){
        slider.style.transform = 'translateX(' + (pointRect.left + 10) + 'px)';
        handleDrag();
       }
       else{
        slider.style.transform = 'translateX(' + (0) + 'px)';
       }
      

      }
      //move to the left
      else if (e.key === 'ArrowLeft'){
        console.log('left key')
        var newPos = pointRect.left - 40;
        if(newPos > guideRect.left){
          console.log('newPos value: ' + newPos);
          slider.style.transform = 'translateX(' + (newPos) + 'px)';
          handleDrag();
        }
        else{
          console.log('newPos value 2: ' + newPos);
          slider.style.transform = 'translateX(' + (guideRect.right - pointRect.right) + 'px)';
        } 
        
      }
    }


  };

  return (
    <FormFieldContainer error={error}>
      <label className="field-label" htmlFor={name}>
        {label}
      </label>
      <div className="flex gap-3">
        <div className={cn("field-input-base flex items-center", isFocused && 'border' )} ref={container} onClick={() => setIsFocused(!isFocused)} onKeyDown={keyMove} tabIndex={0}>
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
