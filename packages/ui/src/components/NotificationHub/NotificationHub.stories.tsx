import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { NotificationHub } from './NotificationHub.js';

import { Button } from '@/components/Button/Button.js';
import { useNotificationsStore } from '@/stores/notifications-store.js';

type Story = StoryObj<typeof NotificationHub>;

const meta: Meta<typeof NotificationHub> = {
  component: NotificationHub,
  decorators: [
    (Story) => {
      const notifications = useNotificationsStore();
      return (
        <div className="border">
          <Story />
          <Button
            label="Add Notification"
            type="button"
            onClick={() => {
              notifications.addNotification({
                type: 'info',
                message: `Notification ${notifications.notifications.length}`
              });
            }}
          />
        </div>
      );
    }
  ]
};

export default meta;

export const Default: Story = {
  args: {
    timeout: 100000
  }
};
