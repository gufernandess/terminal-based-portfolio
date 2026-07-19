import type { CommandHandler, ListItem } from '../types';
import { resolveText } from '../i18n/resolveText';
import {
  aboutBio,
  aboutSkills,
  aboutWorkspace,
  aboutHobbies,
  aboutLanguages,
  aboutMenuTitle,
  aboutHint,
  aboutSubcommandDescriptions,
} from '../content/about';
import { localizedTextEntry, listEntry, errorEntry } from './entries';

export const about: CommandHandler = (args, ctx) => {
  const sub = (args[0] ?? '').toLowerCase();

  if (sub === '') {
    const items: ListItem[] = aboutSubcommandDescriptions.map((s) => ({
      label: s.label,
      description: resolveText(s.description, ctx.language),
    }));
    return {
      entries: [
        localizedTextEntry(aboutBio, ctx.language),
        listEntry(
          resolveText(aboutMenuTitle, ctx.language),
          items,
          resolveText(aboutHint, ctx.language),
        ),
      ],
    };
  }

  if (sub === 'all') {
    const titleFor = (label: string) =>
      resolveText(
        aboutSubcommandDescriptions.find((s) => s.label === label)!.description,
        ctx.language,
      );
    return {
      entries: [
        localizedTextEntry(aboutBio, ctx.language),
        listEntry(titleFor('skills'), aboutSkills),
        listEntry(titleFor('workspace'), aboutWorkspace),
        listEntry(titleFor('hobbies'), resolveText(aboutHobbies, ctx.language)),
        listEntry(titleFor('languages'), resolveText(aboutLanguages, ctx.language)),
      ],
    };
  }

  if (sub === 'skills') {
    return { entries: [listEntry(undefined, aboutSkills)] };
  }
  if (sub === 'workspace') {
    return { entries: [listEntry(undefined, aboutWorkspace)] };
  }
  if (sub === 'hobbies') {
    return { entries: [listEntry(undefined, resolveText(aboutHobbies, ctx.language))] };
  }
  if (sub === 'languages') {
    return {
      entries: [listEntry(undefined, resolveText(aboutLanguages, ctx.language))],
    };
  }

  return {
    entries: [
      errorEntry(
        ctx.language === 'en'
          ? `Unknown "about" subcommand: ${sub}`
          : `Subcomando de "about" desconhecido: ${sub}`,
      ),
    ],
  };
};
