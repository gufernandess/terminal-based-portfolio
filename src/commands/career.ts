import type { CommandHandler } from '../types';
import { resolveText } from '../i18n/resolveText';
import { career as careerList, careerMenuTitle, careerHint } from '../content/career';
import { listEntry, localizedTextEntry, errorEntry } from './entries';

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[\s-]+/g, '-');
}

export const career: CommandHandler = (args, ctx) => {
  if (args.length === 0) {
    return {
      entries: [
        listEntry(
          resolveText(careerMenuTitle, ctx.language),
          careerList.map((c) => c.slug),
          resolveText(careerHint, ctx.language),
        ),
      ],
    };
  }

  const query = normalize(args.join(' '));
  const entry = careerList.find((c) => normalize(c.slug) === query);
  if (!entry) {
    return {
      entries: [
        errorEntry(
          ctx.language === 'en'
            ? `Company not found: ${args.join(' ')}`
            : `Empresa não encontrada: ${args.join(' ')}`,
        ),
      ],
    };
  }

  return { entries: [localizedTextEntry(entry.body, ctx.language)] };
};
