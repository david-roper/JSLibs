import type { Meta, StoryObj } from '@storybook/react';

import { ThemeToggle } from './ThemeToggle';

type Story = StoryObj<typeof ThemeToggle>;

const meta: Meta<typeof ThemeToggle> = { component: ThemeToggle };

export default meta;

export const Default: Story = {};
