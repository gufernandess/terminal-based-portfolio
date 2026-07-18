import { registry } from './registry';

const commandNames = Object.keys(registry);

const fixedSubcommands: Record<string, string[]> = {
  about: ['skills', 'workspace', 'hobbies', 'languages'],
  contacts: ['goto'],
  projects: ['goto'],
  language: ['english', 'portuguese'],
};

export function getCompletions(raw: string): string[] {
  const tokens = raw.split(/\s+/);

  if (tokens.length <= 1) {
    const prefix = (tokens[0] ?? '').toLowerCase();
    return commandNames.filter((name) => name.startsWith(prefix));
  }

  const [command, ...rest] = tokens;
  const subs = fixedSubcommands[command.toLowerCase()];
  if (!subs || rest.length > 1) return [];

  const prefix = (rest[0] ?? '').toLowerCase();
  return subs.filter((sub) => sub.startsWith(prefix));
}
