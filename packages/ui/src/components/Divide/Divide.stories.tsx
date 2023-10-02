import type { Meta, StoryObj } from '@storybook/react';

import { Divide } from './Divide';

type Story = StoryObj<typeof Divide>;

export default { component: Divide } satisfies Meta<typeof Divide>;

export const Default: Story = {};
