import type { CommandHandler, ListItem } from '../types';
import { resolveText } from '../i18n/resolveText';
import { helpEntries, helpMenuTitle } from '../content/misc';
import { listEntry } from './entries';

export const help: CommandHandler = (_args, ctx) => {
  const items: ListItem[] = helpEntries.map((entry) => ({
    label: entry.command,
    description: resolveText(entry.description, ctx.language),
  }));
  return { entries: [listEntry(resolveText(helpMenuTitle, ctx.language), items)] };
};
