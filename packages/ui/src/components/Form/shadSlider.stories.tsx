import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { NumericFieldSlider } from './NumericFieldSlider';

type Story = StoryObj<typeof NumericFieldSlider>;

export default { component: NumericFieldSlider } satisfies Meta<typeof NumericFieldSlider>;

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
            min: 0,
            name: 'slider',
            setValue,
            value
          }}
        />
      );
    }
  ]
};
