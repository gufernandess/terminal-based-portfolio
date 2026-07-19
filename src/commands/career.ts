import type { CommandHandler, OutputEntry } from '../types';
import { resolveText } from '../i18n/resolveText';
import { career as careerList, careerMenuTitle, careerHint } from '../content/career';
import { listEntry, localizedTextEntry, errorEntry, tagsEntry, dividerEntry } from './entries';

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

  if (args[0].toLowerCase() === 'all') {
    const entries: OutputEntry[] = careerList.flatMap((entry, index) => [
      ...(index > 0 ? [dividerEntry()] : []),
      localizedTextEntry(entry.body, ctx.language),
      tagsEntry(entry.tags),
    ]);
    return { entries };
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

  return { entries: [localizedTextEntry(entry.body, ctx.language), tagsEntry(entry.tags)] };
};
