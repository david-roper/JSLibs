import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';

type Story = StoryObj<typeof Card>;

const meta: Meta<typeof Card> = { component: Card };

export default meta;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="font-medium text-xl my-5">Example</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia voluptatibus incidunt id. Minus cupiditate
          eveniet at quam provident saepe repellat maxime natus! Similique provident quia, praesentium reiciendis fugiat
          magnam dolorum?
        </p>
      </div>
    )
  }
};
