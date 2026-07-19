import type { Language, Localized, ListItem, OutputEntry } from '../types';
import { resolveText } from '../i18n/resolveText';

function makeId(): string {
  return crypto.randomUUID();
}

export function textEntry(lines: string[]): OutputEntry {
  return { id: makeId(), kind: 'text', lines };
}

export function localizedTextEntry(
  localized: Localized<string[]>,
  language: Language,
): OutputEntry {
  return textEntry(resolveText(localized, language));
}

export function errorEntry(message: string): OutputEntry {
  return { id: makeId(), kind: 'error', message };
}

export function listEntry(
  title: string | undefined,
  items: string[] | ListItem[],
  hint?: string,
): OutputEntry {
  return { id: makeId(), kind: 'list', title, items, hint };
}

export function tagsEntry(items: string[]): OutputEntry {
  return { id: makeId(), kind: 'tags', items };
}

export function dividerEntry(): OutputEntry {
  return textEntry(['────────────────────────────────────────']);
}

export function commandNotFoundMessage(command: string, language: Language): string {
  return language === 'en'
    ? `command not found: ${command}`
    : `comando não encontrado: ${command}`;
}
