import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './Spinner.js';

type Story = StoryObj<typeof Spinner>;

const meta: Meta<typeof Spinner> = { component: Spinner };

export default meta;

export const Default: Story = {};
