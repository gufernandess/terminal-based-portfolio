export type Language = 'en' | 'pt';

export interface Localized<T> {
  en: T;
  pt: T;
}

export interface ListItem {
  label: string;
  description?: string;
}

export type OutputEntry =
  | { id: string; kind: 'command'; input: string }
  | { id: string; kind: 'text'; lines: string[] }
  | { id: string; kind: 'error'; message: string }
  | { id: string; kind: 'list'; title?: string; items: string[] | ListItem[]; hint?: string }
  | { id: string; kind: 'tags'; items: string[] };

export type CommandEffect =
  | { type: 'open-url'; url: string }
  | { type: 'mailto'; address: string }
  | { type: 'set-language'; language: Language }
  | { type: 'clear' };

export interface CommandResult {
  entries: OutputEntry[];
  effect?: CommandEffect;
}

export interface CommandContext {
  language: Language;
  history: string[];
}

export type CommandHandler = (args: string[], ctx: CommandContext) => CommandResult;
