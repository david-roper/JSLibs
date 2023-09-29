import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './Slider';

type Story = StoryObj<typeof Slider>;

export default { component: Slider } satisfies Meta<typeof Slider>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);
      return (
        <Story
          args={{
            title: 'Example',
            isOpen,
            setIsOpen,
            children: (
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt suscipit vero qui optio explicabo
                  autem eaque, voluptatem dolore nulla, perspiciatis soluta quaerat similique magni amet at quae fuga
                  fugit laborum.
                </p>
              </div>
            )
          }}
        />
      );
    }
  ]
};
