import { useContext } from 'react';

import { FaceSmileIcon } from '@heroicons/react/24/solid';
import type { Meta, StoryObj } from '@storybook/react';

import { Button, StepperContext } from '../..';
import { type Step, Stepper } from './Stepper';

type Story = StoryObj<typeof Stepper>;

const meta: Meta<typeof Stepper> = { component: Stepper };

export default meta;

const MockStep: React.FC<{ step: number }> = ({ step }) => {
  const ctx = useContext(StepperContext);
  return (
    <div>
      <h1 className="text-lg font-medium">Step {step}</h1>
      <p className="text-slate-600 text-sm my-3 dark:text-slate-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde necessitatibus accusantium mollitia, odit
        voluptates veritatis cupiditate eum quod dolore culpa enim reprehenderit et, suscipit aut possimus placeat
        laudantium. Earum dicta totam laudantium, sed voluptate labore neque hic sit molestiae quia soluta consectetur
        ipsam officiis, temporibus debitis nam distinctio minima cupiditate!
      </p>
      <div className="flex gap-x-3">
        <Button label="Previous Step" onClick={() => ctx.updateIndex('decrement')} />
        <Button label="Next Step" onClick={() => ctx.updateIndex('increment')} />
      </div>
    </div>
  );
};

const steps: Step[] = [];
for (let i = 1; i < 4; i++) {
  steps.push({
    element: <MockStep step={i} />,
    icon: <FaceSmileIcon />,
    label: 'Step Number ' + i
  });
}

export const Default: Story = {
  decorators: [
    (Story) => {
      return (
        <div className="max-w-3xl mx-auto">
          <Story args={{ steps }} />
        </div>
      );
    }
  ]
};
