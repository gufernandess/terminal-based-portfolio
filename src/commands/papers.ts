import type { CommandHandler } from '../types';
import { resolveText } from '../i18n/resolveText';
import { papers as papersList, papersMenuTitle, papersHint } from '../content/papers';
import { listEntry, localizedTextEntry, errorEntry } from './entries';

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[\s-]+/g, '-');
}

export const papers: CommandHandler = (args, ctx) => {
  if (args.length === 0) {
    return {
      entries: [
        listEntry(
          resolveText(papersMenuTitle, ctx.language),
          papersList.map((p) => p.slug),
          resolveText(papersHint, ctx.language),
        ),
      ],
    };
  }

  const query = normalize(args.join(' '));
  const paper = papersList.find((p) => normalize(p.slug) === query);
  if (!paper) {
    return {
      entries: [
        errorEntry(
          ctx.language === 'en'
            ? `Paper not found: ${args.join(' ')}`
            : `Artigo não encontrado: ${args.join(' ')}`,
        ),
      ],
    };
  }

  return { entries: [localizedTextEntry(paper.body, ctx.language)] };
};
