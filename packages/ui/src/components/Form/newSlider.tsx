import React, { useEffect, useMemo, useRef, useState } from 'react';

//import { range } from '@douglasneuroinformatics/utils';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import type { Simplify } from 'type-fest';

import { PopoverIcon, cn } from '../..';
import { FormFieldContainer } from './FormFieldContainer';

import type { NumericFieldProps } from './NumericField';

export type NewSliderProps = Simplify<Extract<NumericFieldProps, { variant: 'slider' }>>;

export const NewSlider = ({ description, error, label, max, min, name, setValue, value }: NewSliderProps) => {
  const [isDragging, setDragging] = useState(false)
  const [height, setHeight] = useState(window.innerHeight)
  const [isFocused, setIsFocused] = useState(false)
  const [sliderX, setSliderX] = useState(0)
  const [width, setWidth] = useState(window.innerWidth)
  const gradations = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialSliderX, setInitialSliderX] = useState(0);

const sliderMinX = 0;
let sliderMaxX = 280;

const commonMoving = (pageX: number) => {
  if (isDragging) {
    const dragAmount = pageX - initialMouseX!;
    const targetX = initialSliderX! + dragAmount;

    // keep slider inside limits
    const sliderX = Math.max(Math.min(targetX, sliderMaxX), sliderMinX);
    setSliderX(sliderX);
  }
}

const commonStartDrag = (pageX: number) => {
  setInitialMouseX(pageX);
  setDragging(true);
  setInitialSliderX(sliderX)
}

handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
  if (!isFocused) {
    return;
  }
  if (e.key === 'ArrowRight') {
    let movedRight = sliderX + 10;
    if (movedRight > sliderMaxX) {
      setSliderX(sliderMaxX)
    } else {
      setSliderX(movedRight)
    }
  } else if (e.key === 'ArrowLeft') {
    let movedLeft = sliderX - 10;
    if (movedLeft < sliderMinX) {
      setSliderX(sliderMinX)
    } else {
      setSliderX(movedLeft)
    }
  }
};

const startDrag = (e: React.MouseEvent) => {
  const pageX = e.pageX;
  commonStartDrag(pageX);
}

const startTouchDrag = (e: React.TouchEvent) => {
  e.preventDefault();
  const pageX = e.changedTouches[0]!.pageX;
 commonStartDrag(pageX);
}

const stopDrag = () => {
  setDragging(false)
}

const touchMoving = (e: React.TouchEvent) => {
  e.preventDefault();
  const pageX = e.changedTouches[0]!.pageX;
  commonMoving(pageX);
}
const updateWindowDimensions= () => {
  setHeight(window.innerHeight);
  setWidth(window.innerWidth);
  if (window.innerWidth > 500) {
    sliderMaxX = 520;
  }
}

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
