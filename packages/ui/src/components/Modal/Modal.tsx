'use client';

import React from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';

export type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
  showCloseButton?: boolean;
  title: string;
  width?: 'lg' | 'md' | 'sm' | 'xl';
};

export const Modal = ({ children, onClose, open, showCloseButton, title, width = 'md' }: ModalProps) => {
  return (
    <Transition appear as={React.Fragment} show={open}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'w-full transform relative overflow-visible rounded-2xl text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all',
                  {
                    'max-w-lg': width === 'lg',
                    'max-w-md': width === 'md',
                    'max-w-sm': width === 'sm',
                    'max-w-xl': width === 'xl'
                  }
                )}
              >
                <div className="flex justify-between items-center">
                  <Dialog.Title as="h3" className="text-xl font-bold p-0.5 leading-6">
                    {title}
                  </Dialog.Title>
                  {showCloseButton && (
                    <button
                      className="flex justify-center p-0.5 items-center rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
                      type="button"
                      onClick={onClose}
                    >
                      <XMarkIcon height={24} width={24} />
                    </button>
                  )}
                </div>
                <div className="my-3">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
