import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { FormPageWrapper } from './FormPageWrapper.js';

type Story = StoryObj<typeof FormPageWrapper>;

const meta: Meta<typeof FormPageWrapper> = {
  component: FormPageWrapper,
  args: {
    title: 'Example',
    children: (
      <div className="border">
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi voluptatibus harum et, facilis aut
          distinctio, porro pariatur aperiam consectetur veritatis ad itaque doloremque ex corporis reiciendis non quod
          esse cum.
        </p>
      </div>
    ),
    languageOptions: ['en', 'fr'],
    logo: 'https://placehold.co/400'
  }
};

export default meta;

export const Default: Story = {};
