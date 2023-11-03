import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { NumericFieldSlider } from './NumericFieldSlider';

type Story = StoryObj<typeof NumericFieldSlider>;

export default { component: NumericFieldSlider } satisfies Meta<typeof NumericFieldSlider>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<null | number>(null);
      return (
        <Story
          args={{
            description: 'This is a slider',
            label: 'Slider',
            max: 100,
            min: -100,
            name: 'slider',
            setValue,
            value
          }}
        />
      );
    }
  ]
};
