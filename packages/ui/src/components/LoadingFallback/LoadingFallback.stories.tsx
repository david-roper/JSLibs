import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { LoadingFallback } from './LoadingFallback';

type User = {
  password: string;
  username: string;
};

const users: User[] = [
  {
    password: 'password',
    username: 'Weijie123'
  },
  {
    password: 'password',
    username: 'Ryan123'
  },
  {
    password: 'password',
    username: 'David123'
  }
];

type Story = StoryObj<typeof LoadingFallback<User[]>>;

export default { component: LoadingFallback } satisfies Meta<typeof LoadingFallback>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [data, setData] = useState<User[] | null>(null);

      useEffect(() => {
        setTimeout(() => {
          setData(users);
        }, 2000);
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
