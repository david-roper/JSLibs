import React, { useMemo, useState } from 'react';

import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';

export type ArrowToggleProps = {
  /** The size of the arrow in pixels (default is 16px) */
  arrowSize?: number;

  /** Custom content to insert beside the arrow */
  content?: React.ReactNode;

  /** The position of the custom content, if applicable */
  contentPosition?: 'left' | 'right';

  /** The starting position of the arrow (i.e., which direction does it point to) */
  position: 'down' | 'left' | 'right' | 'up';

  /** The clockwise rotation of the arrow when toggled (e.g., if the position is 'right' and rotation is 90, the arrow will point down) */
  rotation: number;
} & Omit<React.ComponentPropsWithoutRef<'button'>, 'content'>;

export const ArrowToggle = React.forwardRef<HTMLButtonElement, ArrowToggleProps>(function ArrowToggle(
  { arrowSize, className, content, contentPosition, onClick, position, rotation, ...props },
  ref
) {
  const [isToggled, setIsToggled] = useState(false);
  const computedRotation = useMemo(() => {
    const toggleRotation = isToggled ? rotation : 0;
    switch (position) {
      case 'up':
        return 0 + toggleRotation;
      case 'right':
        return 90 + toggleRotation;
      case 'down':
        return 180 + toggleRotation;
      case 'left':
        return 270 + toggleRotation;
    }
  }, [position, rotation, isToggled]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setIsToggled(!isToggled);
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={twMerge('flex items-center justify-center', className)}
      ref={ref}
      type="button"
      onClick={handleClick}
      {...props}
    >
      {content && contentPosition === 'left' && <span className="mr-1">{content}</span>}
      <ChevronUpIcon
        className="transform-gpu transition-transform"
        data-testid="arrow-up-icon"
        height={arrowSize ?? 16}
        style={{ transform: `rotate(${computedRotation}deg)` }}
        width={arrowSize ?? 16}
      />
      {content && contentPosition === 'right' && <span className="ml-1">{content}</span>}
    </button>
  );
});
