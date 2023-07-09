import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './Divider.js';

type Story = StoryObj<typeof Divider>;

export default { component: Divider } satisfies Meta<typeof Divider>;

export const Default: Story = {};
