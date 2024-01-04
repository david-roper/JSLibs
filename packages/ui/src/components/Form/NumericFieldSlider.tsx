import { useEffect, useMemo, useRef, useState } from 'react';

//import { range } from '@douglasneuroinformatics/utils';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
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
  const container = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentValueIndex, setCurrentValueIndex] = useState(0);
  const values = useMemo(() => _.range(min, max + 1), [min, max]);

  const computePositions = () => {
    if (!guide.current) {
      return null;
    }
    const width = guide.current.clientWidth;
    return values.map((_, i) => {
      return (width / values.length) * i;
    });
  };

  const positions = computePositions();

  const handleDragEnd: React.DragEventHandler<HTMLDivElement> = (e) => {
    //find the drag position of the element
    //find the closest indexed point in the positions list to the dragged position
    //snap the ball to that indexed point

    if (!(guide.current && point.current && positions)) {
      return;
    }
    if (!positions[0]) {
      return;
    }

    const dragPos = e.clientX;

    let closestIndex = 0;
    let dragPointDiff = Math.abs(dragPos - positions[0]);

    for (let i = 0; i < positions.length; i++) {
      if (dragPointDiff > Math.abs(dragPos - positions[i]!)) {
        dragPointDiff = Math.abs(dragPos - positions[i]!);
        closestIndex = i;
      }
    }

    setCurrentValueIndex(closestIndex);

    // const guideRect = guide.current.getBoundingClientRect();
    // const offsetLeft = pointRect.left - guideRect.left;
    // const offsetPercentage = offsetLeft / (guideRect.width - pointRect.width);
    // const valueIndex = Math.round((values.length - 1) * offsetPercentage);
    // setValue(values[valueIndex] ?? undefined);
  };

  //potential plan
  //on dragstart have a isdragactive state
  //move the circle with following the pages x-axis movement
  //guide - page

  const handleDrag: React.DragEventHandler<HTMLDivElement> = (e) => {
    if (!(guide.current && point.current && positions)) {
      return;
    }

    console.log('dragging now');

    const guideRect = guide.current.getBoundingClientRect();

    const dragPos = e.clientX;

    // console.log({ guideRect, pointRect, e })
    if (dragPos < guideRect.left) {
      if (positions[0] !== undefined) {
        setCurrentPosition(positions?.[0]);
        point.current.style.left = currentPosition + 'px';
      }
    } else if (dragPos > guideRect.right) {
      setCurrentValueIndex(positions.length);
      point.current.style.left = currentPosition + 'px';
    } else {
      point.current.style.left = dragPos + 'px';
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!(guide.current && point.current && positions) || !isFocused) {
      return;
    }
    if (e.key === 'ArrowRight' && currentValueIndex <= positions.length) {
      setCurrentValueIndex(currentValueIndex + 1);
      setValue(currentPosition);
      console.log(value);
    } else if (e.key === 'ArrowLeft' && currentValueIndex >= 1) {
      setCurrentValueIndex(currentValueIndex - 1);
    }

    // const pointRect = point.current.getBoundingClientRect();
    // const guideRect = guide.current.getBoundingClientRect();

    // console.log('guideRect right pos: ' + guideRect.right)
    // console.log('guideRect left pos: ' + guideRect.left)
    // console.log('pointRect left pos: ' + pointRect.left)
    //move to the right
    // if (e.key === 'ArrowRight') {
    //   console.log('right key')
    //   if (guideRect.right > pointRect.right + 10) {
    //     point.current.clientLeft = pointRect.left + 10;

    //     //point.current.style.transform = 'translateX(' + (pointRect.left + 10) + 'px)';
    //     handleDrag();
    //   } else {
    //     point.current.style.transform = 'translateX(' + 0 + 'px)';
    //   }
    // }
    //   //move to the left
    //   else if (e.key === 'ArrowLeft'){
    //     console.log('left key')
    //     let newPos = pointRect.left - 40;
    //     if(newPos > guideRect.left){
    //       console.log('newPos value: ' + newPos);
    //       point.current.style.transform = 'translateX(' + (newPos) + 'px)';
    //       handleDrag();
    //     }
    //     else{
    //       console.log('newPos value 2: ' + newPos);
    //       point.current.style.transform = 'translateX(' + (guideRect.right - pointRect.right) + 'px)';
    //     }
  };

  useEffect(() => {
    const val = positions?.[currentValueIndex];
    if (typeof val === 'number') {
      setCurrentPosition(val);
    }
  }, [currentValueIndex]);

  return (
    <FormFieldContainer error={error}>
      <label className="field-label" htmlFor={name}>
        {label}
      </label>
      <div className="flex gap-3">
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className={cn('field-input-base flex items-center', isFocused && 'border')}
          ref={container}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          onClick={() => setIsFocused(!isFocused)}
          onKeyDown={handleKeyDown}
        >
          <div
            className="h-1.5 focus:border items-center relative w-full box-content flex pr-2 rounded bg-slate-200 dark:border-slate-600 dark:bg-slate-700 border border-slate-300"
            ref={guide}
            onMouseMove={(e) => {
              console.log(e.pageX);
            }}
          >
            <div
              className="h-5 w-5 rounded-full bg-slate-500 dark:bg-slate-400 absolute cursor-grab"
              draggable={true}
              id="slider-div"
              ref={point}
              style={{ left: currentPosition }}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
            />
          </div>
        </div>
        <div className="flex items-center justify-center text-slate-600 dark:text-slate-300">
          {currentValueIndex ?? 'NA'}
        </div>
        {description && (
          <div className="flex items-center justify-center">
            <PopoverIcon icon={QuestionMarkCircleIcon} position="right" text={description} />
          </div>
        )}
      </div>
    </FormFieldContainer>
  );
};
