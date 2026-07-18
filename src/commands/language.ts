import type { CommandHandler, Language } from '../types';
import { textEntry, errorEntry } from './entries';

const languageMap: Record<string, Language> = {
  english: 'en',
  portuguese: 'pt',
};

export const language: CommandHandler = (args, ctx) => {
  const target = (args[0] ?? '').toLowerCase();
  const next = languageMap[target];

  if (!next) {
    return {
      entries: [
        errorEntry(
          ctx.language === 'en'
            ? 'Usage: language english | language portuguese'
            : 'Uso: language english | language portuguese',
        ),
      ],
    };
  }

  return {
    entries: [
      textEntry([next === 'en' ? 'Language set to English.' : 'Idioma definido para português.']),
    ],
    effect: { type: 'set-language', language: next },
  };
};
