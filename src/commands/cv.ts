import type { CommandHandler } from '../types';
import { cvText, cvUrl } from '../content/cv';
import { localizedTextEntry } from './entries';
import { resolveText } from '../i18n/resolveText';

export const cv: CommandHandler = (_args, ctx) => ({
  entries: [localizedTextEntry(cvText, ctx.language)],
  effect: { type: 'open-url', url: resolveText(cvUrl, ctx.language) },
});
