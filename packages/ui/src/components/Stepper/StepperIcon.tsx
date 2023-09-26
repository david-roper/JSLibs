'use client';

import { clsx } from 'clsx';

export type StepperIconProps = {
  icon: React.ReactElement;
  label: string;
  isActive: boolean;
};

export const StepperIcon = ({ icon, label, isActive = false }: StepperIconProps) => {
  return (
    <div>
      <div className="relative flex items-center">
        <div
          className={clsx(
            'h-12 w-12 rounded-full text-white bg-sky-700 border-2 border-sky-700 py-3 transition duration-500 ease-in-out [&>*]:h-full [&>*]:w-full',
            {
              'opacity-25': !isActive
            }
          )}
        >
          {icon}
        </div>
        <div className="absolute top-0 -ml-10 mt-16 w-32 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300">
          {label}
        </div>
      </div>
    </div>
  );
};
