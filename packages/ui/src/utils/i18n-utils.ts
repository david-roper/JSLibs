/* eslint-disable @typescript-eslint/no-explicit-any */

/** Recurse through the combined translations and include only the provided locale */
export function transformTranslations<T extends Record<string, any>>(translations: T, locale: string) {
  const isPlainObject = Object.getPrototypeOf(translations) === Object.prototype;
  if (!isPlainObject) {
    throw new Error('Invalid format of translations: must be plain object');
  }
  const result: Record<string, unknown> = {};
  for (const key in translations) {
    const value = translations[key];
    if (Object.hasOwn(value, locale)) {
      result[key] = value[locale as keyof typeof value];
    } else {
      result[key] = transformTranslations(value, locale);
    }
  }
  return result;
}
