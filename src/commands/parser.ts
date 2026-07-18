export interface ParsedInput {
  command: string;
  rest: string[];
}

export function parseInput(raw: string): ParsedInput {
  const tokens = raw.trim().split(/\s+/).filter(Boolean);
  const [command, ...rest] = tokens;
  return { command: (command ?? '').toLowerCase(), rest };
}
