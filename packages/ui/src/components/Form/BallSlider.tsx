import React, { useEffect, useMemo, useRef, useState } from 'react';

//import { range } from '@douglasneuroinformatics/utils';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import type { Simplify } from 'type-fest';

import { PopoverIcon, cn } from '../..';
import { FormFieldContainer } from './FormFieldContainer';

import type { NumericFieldProps } from './NumericField';

export type BallSliderProps = Simplify<Extract<NumericFieldProps, { variant: 'slider' }>>;

export const BallSlider = ({ description, error, label, max, min, name, setValue, value }: BallSliderProps) => {
  const [isDragging, setDragging] = useState(false);
  const [height, setHeight] = useState(window.innerHeight);
  const [isFocused, setIsFocused] = useState(false);
  const [sliderX, setSliderX] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const gradations = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialSliderX, setInitialSliderX] = useState(0);

  const sliderMinX = 0;
  let sliderMaxX = 525;

  const commonMoving = (pageX: number) => {
    if (isDragging) {
      const dragAmount = pageX - initialMouseX!;
      const targetX = initialSliderX! + dragAmount;

      // keep slider inside limits
      const sliderX = Math.max(Math.min(targetX, sliderMaxX), sliderMinX);
      setSliderX(sliderX);
    }
  };

  const commonStartDrag = (pageX: number) => {
    setInitialMouseX(pageX);
    setDragging(true);
    setInitialSliderX(sliderX);
  };

  const componentDidMount = () => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
  };

  const componentWillUnmount = () => {
    window.removeEventListener('resize', updateWindowDimensions);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    console.log('key is clicked')
    if (!isFocused) {
      return;
    }
    if (e.key === 'ArrowRight') {
      let movedRight = sliderX + 10;
      if (movedRight > sliderMaxX) {
        setSliderX(sliderMaxX);
      } else {
        setSliderX(movedRight);
      }
    } else if (e.key === 'ArrowLeft') {
      let movedLeft = sliderX - 10;
      if (movedLeft < sliderMinX) {
        setSliderX(sliderMinX);
      } else {
        setSliderX(movedLeft);
      }
    }
  };

  const startDrag = (e: React.MouseEvent) => {
    const pageX = e.pageX;
    commonStartDrag(pageX);
  };

  const startTouchDrag = (e: React.TouchEvent) => {
    e.preventDefault();
    const pageX = e.changedTouches[0]!.pageX;
    commonStartDrag(pageX);
  };

  const stopDrag = () => {
    setDragging(false);
  };

  const touchMoving = (e: React.TouchEvent) => {
    e.preventDefault();
    const pageX = e.changedTouches[0]!.pageX;
    commonMoving(pageX);
  };
  const updateWindowDimensions = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
    if (window.innerWidth > 500) {
      sliderMaxX = 520;
    }
  };

  const mouseMoving = (e: React.MouseEvent) => {
    const pageX = e.pageX;
    commonMoving(pageX);
  };

  const currentValue = () => {
    const valueRangeStart = 0;
    const valueRange = 10;
    setValue((sliderX / sliderMaxX) * valueRange + valueRangeStart);
    return (sliderX / sliderMaxX) * valueRange + valueRangeStart;
  };

  return (
    <FormFieldContainer error={error}>
      <label className="field-label" htmlFor={name}>
        {label}
      </label>
      <div className="grid grid-cols-[1fr] grid-rows-[3fr_1fr] overflow-x-hidden" id="app">
        <div className="relative bg-slate-200 dark:border-slate-600 dark:bg-slate-700 border border-slate-300">
          <div className="left-[calc(50%_-_300px)] absolute select-none bottom-[25px]">
            {gradations.map((value, i) => (
              <div className="relative text-center inline-block w-10 opacity-70 mx-1.5 my-0" key={i}>
                <span className="relative text-center inline-block w-10 opacity-70 mx-1.5 my-0-number">{value}</span>
                <br />
                <span className="relative text-center inline-block w-10 opacity-70 mx-1.5 my-0-line">|</span>
              </div>
            ))}
            <div className="relative text-center inline-block w-10 opacity-70 mx-1.5 my-0-number left-4 text-[4vh]">
              {Math.round(currentValue())}
            </div>
            <div className="relative text-center inline-block my-0-number left-8">
              <PopoverIcon icon={QuestionMarkCircleIcon} position="left" text={description} />
            </div>
          </div>
        </div>

        <div className="bg-[#ccc] h-3/4">
          <div
            className={
              'w-[600px] h-20 mt-[-30px] ml-[calc(50%_-_340px)] relative touch-none select-none ' +
              (isDragging ? 'cursor-grabbing ' : '')
            }
            style={{ left: sliderX }}
            onMouseMove={mouseMoving}
            onMouseUp={stopDrag}
            onTouchEnd={stopDrag}
            onTouchMove={touchMoving}
          >
            <svg fill="none" height="30" viewBox="0 0 150 30" width="150" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M74.3132 0C47.0043 2.44032e-05 50.175 30 
              7.9179 30H144.27C99.4571 30 101.622 -2.44032e-05 74.3132 0Z"
                fill="#ccc"
                transform="translate(-7.38794 0.5)"
              />
            </svg>

            <div
              className={cn(
                'absolute focus:border-2 w-[50px] h-[50px] bg-slate-500 dark:bg-slate-400 cursor-grab touch-none select-none rounded-[50%] left-[42px] top-[5px]',
                isDragging && 'cursor-grabbing'
              )}
              tabIndex={0}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              onMouseDown={startDrag}
              onTouchStart={startTouchDrag}
            >
              <i className="text-[white] ml-[21px] mt-4"></i>
            </div>
          </div>
        </div>
      </div>

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
