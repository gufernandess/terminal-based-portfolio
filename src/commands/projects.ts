import type { CommandHandler, OutputEntry } from '../types';
import { resolveText } from '../i18n/resolveText';
import { projects as projectsList, projectsMenuTitle, projectsHint } from '../content/projects';
import { listEntry, localizedTextEntry, errorEntry, tagsEntry, dividerEntry } from './entries';

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

  if (args[0].toLowerCase() === 'all') {
    const entries: OutputEntry[] = projectsList.flatMap((project, index) => [
      ...(index > 0 ? [dividerEntry()] : []),
      localizedTextEntry(project.body, ctx.language),
      tagsEntry(project.tags),
    ]);
    return { entries };
  }

  const query = normalize(args.join(' '));
  const project = projectsList.find((p) => normalize(p.slug) === query);
  if (!project) {
    return {
      entries: [
        errorEntry(
          ctx.language === 'en'
            ? `Project not found: ${args.join(' ')}`
            : `Projeto não encontrado: ${args.join(' ')}`,
        ),
      ],
    };
  }

  return { entries: [localizedTextEntry(project.body, ctx.language), tagsEntry(project.tags)] };
};
