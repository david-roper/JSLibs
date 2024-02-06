import { useTranslation } from 'react-i18next';
import type { SetOptional } from 'type-fest';

import { BaseLanguageToggle, type BaseLanguageToggleProps } from './BaseLanguageToggle';

export type LanguageToggleProps<T extends string> = SetOptional<BaseLanguageToggleProps<T>, 'i18n'>;

export const LanguageToggle = <T extends string = string, P extends LanguageToggleProps<T> = LanguageToggleProps<T>>(
  props: P
) => {
  const { i18n } = useTranslation();
  return <BaseLanguageToggle i18n={i18n} {...props} />;
};
