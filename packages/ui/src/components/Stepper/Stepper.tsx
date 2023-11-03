'use client';

import React, { useEffect, useReducer, useRef, useState } from 'react';

import clsx from 'clsx';

import { StepperContext } from '../../context/StepperContext';
import { useWindowSize } from '../../hooks/useWindowSize';

type Step = {
  element: React.ReactElement;
  icon: React.ReactElement;
  label: string;
};

type StepperProps = {
  steps: Step[];
};

const Stepper = ({ steps }: StepperProps) => {
  const icons = useRef<HTMLDivElement[]>([]);
  const [divideStyles, setDivideStyles] = useState<React.CSSProperties[]>([]);
  const { height, width } = useWindowSize();

  useEffect(() => {
    const styles: React.CSSProperties[] = [];
    for (let i = 0; i < steps.length - 1; i++) {
      const current = icons.current[i]!;
      const next = icons.current[i + 1]!;
      const left = current.offsetLeft + current.offsetWidth;
      styles.push({
        left,
        width: next.offsetLeft - left
      });
    }
    setDivideStyles(styles);
  }, [height, width]);

  const [index, updateIndex] = useReducer((prevIndex: number, action: 'decrement' | 'increment') => {
    if (action === 'decrement' && prevIndex > 0) {
      return prevIndex - 1;
    } else if (action === 'increment' && prevIndex < steps.length - 1) {
      return prevIndex + 1;
    }
    return prevIndex;
  }, 0);

  return (
    <StepperContext.Provider value={{ index, updateIndex }}>
      <div className="mb-16 flex items-center print:hidden justify-between relative">
        {steps.map((step, i) => {
          return (
            <React.Fragment key={i}>
              <div className="flex items-center">
                <div className="flex flex-col justify-center items-center">
                  <div
                    className={clsx(
                      'h-12 w-12 rounded-full text-white bg-sky-700  py-3 transition duration-500 ease-in-out [&>*]:h-full [&>*]:w-full',
                      i > index && 'bg-slate-200'
                    )}
                    ref={(e) => {
                      icons.current[i] = e!;
                    }}
                  >
                    {step.icon}
                  </div>
                  <span className="text-xs mt-2 font-medium uppercase text-slate-600 dark:text-slate-300">
                    {step.label}
                  </span>
                </div>
              </div>
              {i !== steps.length - 1 && (
                <div
                  className={clsx(
                    'flex-auto absolute top-6 border-t-2 transition duration-500 ease-in-out -z-10',
                    i >= index ? 'border-slate-200 dark:border-slate-700' : 'border-sky-700'
                  )}
                  style={divideStyles[i]}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div>{steps[index]?.element}</div>
    </StepperContext.Provider>
  );
};

export { type Step, Stepper, type StepperProps };
