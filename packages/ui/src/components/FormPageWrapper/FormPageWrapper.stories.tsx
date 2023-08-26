import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../Form/Form.js';

import { FormPageWrapper } from './FormPageWrapper.js';

type Story = StoryObj<typeof FormPageWrapper>;

const meta: Meta<typeof FormPageWrapper> = {
  component: FormPageWrapper,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    title: 'Example',
    children: (
      <Form
        content={{
          v1: {
            kind: 'text',
            label: 'Value 1',
            variant: 'short'
          },
          v2: {
            kind: 'text',
            label: 'Value 2',
            variant: 'short'
          },
          v3: {
            kind: 'text',
            label: 'Value 3',
            variant: 'short'
          },
          v4: {
            kind: 'text',
            label: 'Value 4',
            variant: 'short'
          },
          v5: {
            kind: 'text',
            label: 'Value 5',
            variant: 'short'
          },
          v6: {
            kind: 'text',
            label: 'Value 6',
            variant: 'long'
          },
          v7: {
            kind: 'text',
            label: 'Value 7',
            variant: 'long'
          },
          v8: {
            kind: 'text',
            label: 'Value 8',
            variant: 'short'
          }
        }}
        validationSchema={{ type: 'object', required: [] }}
        onSubmit={(data) => {
          alert(JSON.stringify(data));
        }}
      />
    ),
    languageToggle: {
      options: ['en', 'fr'],
      dropdownDirection: 'up'
    },
    logo: 'https://placehold.co/400'
  }
};

export default meta;

export const Default: Story = {};
