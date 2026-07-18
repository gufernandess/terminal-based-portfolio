import type { CommandHandler } from '../types';
import { educationText } from '../content/education';
import { localizedTextEntry } from './entries';

export const education: CommandHandler = (_args, ctx) => ({
  entries: [localizedTextEntry(educationText, ctx.language)],
});
