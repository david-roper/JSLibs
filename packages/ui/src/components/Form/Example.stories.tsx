import type { Meta, StoryObj } from '@storybook/react';

import { Example } from './Example';

type Story = StoryObj<typeof Example>;

export default { component: Example } satisfies Meta<typeof Example>;

export const Default: Story = {}