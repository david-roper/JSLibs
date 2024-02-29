import { ChevronDownIcon } from '@heroicons/react/24/solid';

import type { ButtonProps } from '../../components/Button';

const ICON_SIZE = {
  lg: 18,
  md: 16,
  sm: 14
};

export type DropdownIconProps = {
  size?: NonNullable<ButtonProps['size']>;
};

export const DropdownIcon = ({ size = 'md' }: DropdownIconProps) => {
  return <ChevronDownIcon height={ICON_SIZE[size]} width={ICON_SIZE[size]} />;
};
