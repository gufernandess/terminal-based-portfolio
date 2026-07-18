import type { CommandHandler } from '../types';
import { resolveText } from '../i18n/resolveText';
import { projects as projectsList, projectsMenuTitle, projectsHint } from '../content/projects';
import { listEntry, localizedTextEntry, errorEntry } from './entries';

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[\s-]+/g, '-');
}

export const projects: CommandHandler = (args, ctx) => {
  if (args.length === 0) {
    return {
      entries: [
        listEntry(
          resolveText(projectsMenuTitle, ctx.language),
          projectsList.map((p) => p.slug),
          resolveText(projectsHint, ctx.language),
        ),
      ],
    };
  }

  const [sub, ...rest] = args;
  if (sub.toLowerCase() !== 'goto' || rest.length === 0) {
    return {
      entries: [
        errorEntry(
          ctx.language === 'en' ? 'Usage: projects goto <name>' : 'Uso: projects goto <nome>',
        ),
      ],
    };
  }

  const query = normalize(rest.join(' '));
  const project = projectsList.find((p) => normalize(p.slug) === query);
  if (!project) {
    return {
      entries: [
        errorEntry(
          ctx.language === 'en'
            ? `Project not found: ${rest.join(' ')}`
            : `Projeto não encontrado: ${rest.join(' ')}`,
        ),
      ],
    };
  }

  return {
    entries: [localizedTextEntry(project.body, ctx.language)],
    effect: { type: 'open-url', url: project.url },
  };
};
