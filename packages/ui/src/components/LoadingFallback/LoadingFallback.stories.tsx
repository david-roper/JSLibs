import React, { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { LoadingFallback } from './LoadingFallback';

type User = {
  username: string;
  password: string;
};

const users: User[] = [
  {
    username: 'Weijie123',
    password: 'password'
  },
  {
    username: 'Ryan123',
    password: 'password'
  },
  {
    username: 'David123',
    password: 'password'
  }
];

type Story = StoryObj<typeof LoadingFallback<User[]>>;

export default { component: LoadingFallback } satisfies Meta<typeof LoadingFallback>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [data, setData] = useState<User[] | null>(null);

      useEffect(() => {
        setTimeout(() => setData(users), 2000);
      }, []);

      return (
        <Story
          args={{
            children: (data) => {
              return JSON.stringify(data);
            },
            data
          }}
        />
      );
    }
  ]
};
