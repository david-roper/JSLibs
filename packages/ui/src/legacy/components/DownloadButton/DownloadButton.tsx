import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

import { cn } from '@/utils';

export type DownloadButtonProps = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: number;
};

export const DownloadButton = ({ className, onClick, size = 24 }: DownloadButtonProps) => {
  return (
    <button
      className={cn(
        'rounded-md p-2 transition-transform hover:backdrop-brightness-95 dark:hover:backdrop-brightness-150',
        className
      )}
      type="button"
      onClick={onClick}
    >
      <ArrowDownTrayIcon height={size} width={size} />
    </button>
  );
};
