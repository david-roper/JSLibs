import React, { useEffect, useRef, useState } from 'react';

//import { range } from '@douglasneuroinformatics/utils';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import type { Simplify } from 'type-fest';

import { PopoverIcon, cn } from '../..';
import { FormFieldContainer } from './FormFieldContainer';

import type { NumericFieldProps } from './NumericField';

export type BallSliderProps = Simplify<Extract<NumericFieldProps, { variant: 'ballslider' }>>;

export const BallSlider = ({ description, error, label, max, min, name, setValue, value }: BallSliderProps) => {
  const [isDragging, setDragging] = useState(false);
  //const [height, setHeight] = useState(window.innerHeight);
  const [isFocused, setIsFocused] = useState(false);
  const [sliderX, setSliderX] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const gradations: number[] = [];
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialSliderX, setInitialSliderX] = useState(0);
  const guide = useRef<HTMLDivElement>(null);
  const helpBox = useRef<HTMLDivElement>(null);
  const displayVal = useRef<HTMLDivElement>(null);
  let sliderMinX = 0;
  let sliderMaxX = 0;

  for (let i = min; i <= max; i++) {
    gradations.push(i);
  }

  if (guide.current && helpBox.current && displayVal.current) {
    const guideRect = guide.current.getBoundingClientRect();
    const helpBoxRect = helpBox.current.getBoundingClientRect();
    const displayValRect = displayVal.current.getBoundingClientRect();

    sliderMaxX = Math.round(guideRect.width - helpBoxRect.width * 1.6 - displayValRect.width * 1.6) - 15;
    if (guideRect.width > 1200) {
      sliderMaxX = Math.round(guideRect.width - helpBoxRect.width * 3 - displayValRect.width * 3) - 15;
    } else if (guideRect.width > 960) {
      sliderMaxX = Math.round(guideRect.width - helpBoxRect.width * 2.7 - displayValRect.width * 2.7) - 15;
    }
  } else {
    sliderMaxX = Math.round(47.74 * gradations.length);
  }

  const commonMoving = (pageX: number) => {
    if (isDragging) {
      const dragAmount = pageX - initialMouseX;
      const targetX = initialSliderX + dragAmount;

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

  // const componentDidMount = () => {
  //   updateWindowDimensions();
  //   window.addEventListener('resize', updateWindowDimensions);
  // };

  // const componentWillUnmount = () => {
  //   window.removeEventListener('resize', updateWindowDimensions);
  // };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
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
  // const updateWindowDimensions = () => {
  //   //setHeight(window.innerHeight);
  //   setWidth(window.innerWidth);
  //   if (width > 500) {
  //     sliderMaxX = 525;
  //   }
  // };

  const mouseMoving = (e: React.MouseEvent) => {
    const pageX = e.pageX;
    commonMoving(pageX);
  };

  const currentValue = () => {
    const valueRangeStart = min;
    const valueRange = max - min;
    return (sliderX / sliderMaxX) * valueRange + valueRangeStart;
  };

  const gradationElementStyle = (value: number) => {
    const nearDistance = 0.5;
    const liftDistance = 12;

    const diff = Math.abs(currentValue() - value);
    const distY = diff / nearDistance - 1;

    // constrain the distance so that the element doesn't go to the bottom
    const elementY = Math.min(distY * liftDistance, 0);
    const lift = { top: `${elementY}px` };

    return lift;
  };

  useEffect(() => {
    const newValue = Math.round(currentValue());
    setValue(newValue);
  }, [sliderX, setValue]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      // set initial slider pos back to zero after resize
      setInitialSliderX(0);
      setSliderX(0);
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <FormFieldContainer error={error}>
      <div className="grid grid-cols-[1fr] grid-rows-[3fr_1fr] overflow-x-hidden" id="app">
        <div className="relative bg-slate-100 dark:border-slate-600 dark:bg-slate-700">
          <label className="relative field-label left-2" htmlFor={name}>
            {label}
          </label>
          <div id="tickbar" ref={guide} className="absolute justify-between select-none bottom-[25px]">
            {gradations.map((val, i) => (
              <div
                className="relative text-center inline-block 2xl:w-28 xl:w-20 lg:w-18 sm:w-8 opacity-70 mx-1.5 my-0"
                key={i}
                style={gradationElementStyle(val)}
              >
                <span className="relative text-center inline-block opacity-70 mx-1.5 my-0-number ">{val}</span>
                <br />
                <span className="relative text-center inline-block opacity-70 mx-1.5 my-0-line ">|</span>
              </div>
            ))}
            <div
              ref={displayVal}
              className="relative text-right inline-block 2xl:w-2 xl:w-6 md:w-4 w-2 opacity-70 mx-1.5 my-0-number left-2 sm:text-[4vh] text-[3vh] end-0"
            >
              {Math.round(currentValue())}
            </div>
            <div ref={helpBox} className="relative text-center inline-block my-0-number xl:left-9 left-8">
              <PopoverIcon icon={QuestionMarkCircleIcon} position="left" text={description!} />
            </div>
          </div>
        </div>
        {/*bg-[#ccc] */}
        <div className="bg-slate-100 h-1/2">
          <div>
            <div
              className={
                'w-[600px] h-20 mt-[-30px] ml-[-45px] sm:ml-[-35px] relative touch-none select-none ' +
                (isDragging ? 'cursor-grabbing ' : '')
              }
              style={{ left: sliderX }}
              onMouseMove={mouseMoving}
              onMouseUp={stopDrag}
              onTouchEnd={stopDrag}
              onTouchMove={touchMoving}
            >
              {/*fill="#ccc" */}
              <svg fill="none" height="30" viewBox="0 0 150 30" width="150" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M74.3132 0C47.0043 2.44032e-05 50.175 30 
              7.9179 30H144.27C99.4571 30 101.622 -2.44032e-05 74.3132 0Z"
                  fill="bg-slate-100"
                  transform="translate(-7.38794 0.5)"
                />
              </svg>

              <div
                className={cn(
                  'absolute focus:border-2 xl:w-[47px] xl:h-[47px] sm:w-[37px] sm:h-[37px] w-[20px] h-[20px] bg-slate-500 dark:bg-slate-400 cursor-grab touch-none select-none rounded-[50%] left-[47px] top-[5px]',
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
      </div>
    </FormFieldContainer>
  );
};
