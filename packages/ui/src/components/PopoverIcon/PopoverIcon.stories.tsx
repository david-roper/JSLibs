import { FaceSmileIcon } from '@heroicons/react/24/outline';
import type { Meta, StoryObj } from '@storybook/react';

import { PopoverIcon } from './PopoverIcon';

type Story = StoryObj<typeof PopoverIcon>;

const meta: Meta<typeof PopoverIcon> = { component: PopoverIcon };

export default meta;

export const Short: Story = {
  args: {
    icon: FaceSmileIcon,
    text: 'Example',
    position: 'left'
  }
};

export const Long: Story = {
  args: {
    icon: FaceSmileIcon,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates aut totam, reprehenderit culpa non quasi voluptate dolorem id sed assumenda expedita esse tempora! Quod ea asperiores, deserunt rerum laudantium quam.',
    position: 'left'
  }
};
