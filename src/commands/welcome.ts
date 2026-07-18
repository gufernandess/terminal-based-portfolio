import type { CommandHandler } from '../types';
import { welcomeText } from '../content/misc';
import { localizedTextEntry } from './entries';

export const welcome: CommandHandler = (_args, ctx) => ({
  entries: [localizedTextEntry(welcomeText, ctx.language)],
});
