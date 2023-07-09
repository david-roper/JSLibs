'use client';

import { useContext } from 'react';

import { StepperContext } from '../context/StepperContext.js';

export function useStepper() {
  return useContext(StepperContext);
}
