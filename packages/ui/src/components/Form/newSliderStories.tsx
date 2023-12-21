import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { NewSlider } from './newSlider';

type Story = StoryObj<typeof NewSlider>;

export default { component: NewSlider } satisfies Meta<typeof NewSlider>;

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
