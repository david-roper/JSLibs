import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { BallSlider } from './BallSlider';

type Story = StoryObj<typeof BallSlider>;

export default { component: BallSlider } satisfies Meta<typeof BallSlider>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<number>();
      return (
        <Story
          args={{
            description: 'This is a slider',
            label: 'Slider',
            max: 10,
            min: -10,
            name: 'slider',
            setValue,
            value
          }}
        />
      );
    }
  ]
};
