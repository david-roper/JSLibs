import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

export type FormErrorMessageProps = {
  message: string;
};

export const FormErrorMessage = ({ message }: FormErrorMessageProps) => (
  <div className="text-red-600 mt-2 flex items-center gap-1">
    <ExclamationCircleIcon height={16} width={16} />
    <span>{message}</span>
  </div>
);
