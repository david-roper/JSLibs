import { FaceSmileIcon } from '@heroicons/react/24/solid';
import type { Meta, StoryObj } from '@storybook/react';

import { PopoverIcon } from './PopoverIcon.js';

type Story = StoryObj<typeof PopoverIcon>;

const meta: Meta<typeof PopoverIcon> = { component: PopoverIcon };

export default meta;

export const Default: Story = {
  args: {
    icon: FaceSmileIcon,
    text: 'Example',
    position: 'left'
  }
};
