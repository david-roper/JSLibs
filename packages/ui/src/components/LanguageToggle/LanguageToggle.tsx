import { useTranslation } from 'react-i18next';

import { BaseLanguageToggle, type BaseLanguageToggleProps } from './BaseLanguageToggle';

export type LanguageToggleProps<T extends string> = Omit<BaseLanguageToggleProps<T>, 'i18n'>;

export const LanguageToggle = <T extends string = string>(props: LanguageToggleProps<T>) => {
  const { i18n } = useTranslation();

  return <BaseLanguageToggle i18n={i18n} {...props} />;
};
