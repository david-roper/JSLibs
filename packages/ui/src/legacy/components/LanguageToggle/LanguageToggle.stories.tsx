import type { Meta, StoryObj } from '@storybook/react';

import { LanguageToggle } from './LanguageToggle';

type Story = StoryObj<typeof LanguageToggle>;

const meta: Meta<typeof LanguageToggle> = {
  args: {
    options: ['en', 'fr']
  },
  component: LanguageToggle
};

export default meta;

export const Default: Story = {};
