import { useCallback, useMemo, useRef, useState } from 'react';

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
  const [isDragActive, setIsDragActive] = useState(false);

  const guide = useRef<HTMLDivElement>(null);
  const point = useRef<HTMLButtonElement>(null);

  const values = useMemo(() => range(min, max + 1), [min, max]);

  const calculateVal = (guidePos: number, pointPos: number, guideWidth: number, pointWidth: number) => {
    const offsetLeft = pointPos - guidePos;
    const offsetPercentage = offsetLeft / (guideWidth - pointWidth);
    const valueIndex = Math.round((values.length - 1) * offsetPercentage);
    return valueIndex;
  };

  const handleDrag: React.DragEventHandler<HTMLButtonElement> = useCallback((event) => {
    if (!(guide.current && point.current)) {
      return;
    }
    const guideRect = guide.current.getBoundingClientRect();
    const pointRect = point.current.getBoundingClientRect();

    console.log(event)

    // const offsetLeft = pointRect.left - guideRect.left;
    // const offsetPercentage = offsetLeft / (guideRect.width - pointRect.width);
    // const valueIndex = Math.round((values.length - 1) * offsetPercentage);
    // console.log('new value ' + valueIndex);
    setValue(values[calculateVal(guideRect.left, pointRect.left, guideRect.width, pointRect.width)] ?? undefined);
  }, []);

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    console.log('Will handle key down');
    dragControls.start(event, { snapToCursor: true });
  };

  // const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
  //   if (!(guide.current && point.current)) {
  //     return;
  //   }

  //   const pointRect = point.current.getBoundingClientRect();
  //   const guideRect = guide.current.getBoundingClientRect();

  //   //move to the right
  //   if (e.key === 'ArrowRight') {
  //     // console.log('guide rect right ' + guideRect.right);
  //     console.log('pt rect right ' + pointRect.right);
  //     if (guideRect.right > pointRect.right + 10) {
  //       //point.current.clientLeft = pointRect.left + 10;
  //       point.current.style.transform = 'translateX(' + (pointRect.left + 10) + 'px)';
  //       console.log(point.current.style.transform )
  //     } else {
  //       console.log('reset');
  //       point.current.style.transform = 'translateX(' + 0 + 'px)';
  //     }
  //     setValue(values[calculateVal(guideRect.left, pointRect.left, guideRect.width, pointRect.width)] ?? undefined);
  //   }
  //   //move to the left
  //   else if (e.key === 'ArrowLeft') {
  //     console.log('guide rect right ' + guideRect.left);
  //     console.log('pt rect right ' + pointRect.left);
  //     let newPos = pointRect.left - 40;
  //     if (newPos > guideRect.left) {
  //       point.current.style.transform = 'translateX(' + newPos + 'px)';
  //       setValue(values[calculateVal(guideRect.left, pointRect.left, guideRect.width, pointRect.width)] ?? undefined);
  //     } else {
  //       point.current.style.transform = 'translateX(' + (guideRect.right - pointRect.right) + 'px)';
  //       setValue(values[calculateVal(guideRect.left, pointRect.left, guideRect.width, pointRect.width)] ?? undefined);
  //     }
  //   }
  // };

  return (
    <FormFieldContainer error={error}>
      <label className="field-label" htmlFor={name}>
        {`${label} `}
      </label>
      <div className="flex gap-3 relative">
        {/* Add relative positioning to the container */}
        {values.map((val, i) => (
          <div
            className="absolute text-center opacity-70 bottom-10"
            key={i}
            style={{ left: `${(i / (values.length - 1)) * 100}%`, transform: 'translateX(-50%)', zIndex: 2 }} // Position absolutely, calculate left based on index
          >
            <span className="inline-block opacity-70 my-0-number">{val}</span>
            <br />
            <span className="inline-block opacity-70 my-0-line">|</span>
          </div>
        ))}
        <div className="field-input-base flex items-center">
          <div
            className="h-1.5 items-center w-full box-content flex pr-2 rounded bg-slate-200 dark:border-slate-600 dark:bg-slate-700 border border-slate-300"
            ref={guide}
          >
            <button className={cn("h-5 w-5 rounded-full bg-slate-500 dark:bg-slate-400", isDragActive && 'cursor-grabbing')} ref={point} tabIndex={0} onClick={() => setIsDragActive(true)} />
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
