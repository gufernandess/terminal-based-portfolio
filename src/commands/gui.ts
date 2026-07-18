import type { CommandHandler } from '../types';
import { guiText, guiUrl } from '../content/misc';
import { localizedTextEntry } from './entries';

export const gui: CommandHandler = (_args, ctx) => ({
  entries: [localizedTextEntry(guiText, ctx.language)],
  effect: { type: 'open-url', url: guiUrl },
});
