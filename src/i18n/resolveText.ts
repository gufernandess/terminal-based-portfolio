import type { Language, Localized } from '../types';

export function resolveText<T>(localized: Localized<T>, language: Language): T {
  return localized[language];
}
