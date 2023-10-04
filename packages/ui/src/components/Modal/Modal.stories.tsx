import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';
import { Modal } from './Modal';

type Story = StoryObj<typeof Modal>;

const meta: Meta<typeof Modal> = {
  args: {
    onClose: () => {
      alert('Close!');
    },
    open: true,
    showCloseButton: false,
    title: 'Terms and Conditions'
  },
  component: Modal
};

export default meta;

export const Default: Story = {
  args: {
    children: (
      <>
        <div className="mt-2">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Please indicate whether you accept our terms and conditions
          </p>
        </div>

        <div className="mt-4 flex">
          <Button className="mr-2" label="Accept" variant="primary" />
          <Button label="Decline" variant="secondary" />
        </div>
      </>
    )
  }
};
