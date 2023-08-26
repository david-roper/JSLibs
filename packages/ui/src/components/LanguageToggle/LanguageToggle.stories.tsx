import type { Meta, StoryObj } from '@storybook/react';

import { withI18nProvider } from '../../utils/with-i18n-provider.js';

import { LanguageToggle } from './LanguageToggle.js';

type Story = StoryObj<typeof LanguageToggle>;

const meta: Meta<typeof LanguageToggle> = {
  component: withI18nProvider(LanguageToggle),
  args: {
    options: ['en', 'fr']
  }
};

export default meta;

export const Default: Story = {};
