import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from './Dropdown';

type Story = StoryObj<typeof Dropdown>;

export default { component: Dropdown } satisfies Meta<typeof Dropdown>;

export const Default: Story = {
  args: {
    options: ['Option 1', 'Option 2'],
    title: 'Dropdown'
  }
};
