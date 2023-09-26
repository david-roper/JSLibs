'use client';

import { clsx } from 'clsx';

type StepperDividerProps = {
  isActive: boolean;
};

export const StepperDivider = ({ isActive = false }: StepperDividerProps) => {
  return (
    <div
      className={clsx('flex-auto border-sky-700 border-t-2 transition duration-500 ease-in-out', {
        'border-opacity-25': !isActive
      })}
    />
  );
};
