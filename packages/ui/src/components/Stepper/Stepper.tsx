'use client';

import React, { useReducer } from 'react';

import { StepperContext } from '../../context/StepperContext';
import { StepperDivider } from './StepperDivider';
import { StepperIcon } from './StepperIcon';

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
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <StepperIcon icon={step.icon} isActive={i === index} label={step.label} />
            {i < steps.length - 1 && <StepperDivider isActive={i < index} />}
          </React.Fragment>
        ))}
      </div>
      <div>{steps[index]?.element}</div>
    </StepperContext.Provider>
  );
};

export { type Step, Stepper, type StepperProps };
