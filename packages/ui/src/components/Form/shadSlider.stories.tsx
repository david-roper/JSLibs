import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { shadSlider } from './shadSlider';

type Story = StoryObj<typeof shadSlider>;

export default { component: shadSlider } satisfies Meta<typeof shadSlider>;

export const Default: Story = {
  decorators: [
    (Story) => {
      return (
        <Story
          args={{
          }}
        />
      );
    }
  ]
};
