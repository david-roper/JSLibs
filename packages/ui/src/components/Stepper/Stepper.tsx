'use client';

import React, { useReducer } from 'react';

import clsx from 'clsx';

import { StepperContext } from '../../context/StepperContext';

type Step = {
  element: React.ReactElement;
  icon: React.ReactElement;
  label: string;
};

type StepperProps = {
  steps: Step[];
};

const Stepper = ({ steps }: StepperProps) => {
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
      <div className="mb-16 flex items-center print:hidden">
        {steps.map((step, i) => {
          return (
            <React.Fragment key={i}>
              <div>
                <div className="relative flex items-center">
                  <div
                    className={clsx(
                      'h-12 w-12 rounded-full text-white bg-sky-700 border-2 border-sky-700 py-3 transition duration-500 ease-in-out [&>*]:h-full [&>*]:w-full',
                      i > index && 'opacity-25'
                    )}
                  >
                    {step.icon}
                  </div>
                  <div className="absolute top-0 -ml-10 mt-16 w-32 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300">
                    {step.label}
                  </div>
                </div>
              </div>
              {i !== steps.length - 1 && (
                <div
                  className={clsx(
                    'flex-auto border-t-2 transition duration-500 ease-in-out',
                    i >= index ? 'border-slate-200 dark:border-slate-700' : 'border-sky-700'
                  )}
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
