import type { CommandHandler } from '../types';
import { resolveText } from '../i18n/resolveText';
import { historyMenuTitle } from '../content/misc';
import { listEntry } from './entries';

export const history: CommandHandler = (_args, ctx) => ({
  entries: [listEntry(resolveText(historyMenuTitle, ctx.language), ctx.history)],
});
