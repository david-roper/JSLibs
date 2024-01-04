import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { NewSlider2 } from './newSlider2';

type Story = StoryObj<typeof NewSlider2>;

export default { component: NewSlider2 } satisfies Meta<typeof NewSlider2>;

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
