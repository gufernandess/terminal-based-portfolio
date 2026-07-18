import type { CommandContext, CommandResult } from '../types';
import { parseInput } from './parser';
import { registry } from './registry';
import { errorEntry, commandNotFoundMessage } from './entries';

export function runCommand(raw: string, ctx: CommandContext): CommandResult | null {
  const { command, rest } = parseInput(raw);
  if (command === '') return null;

  const handler = registry[command];
  if (!handler) {
    return { entries: [errorEntry(commandNotFoundMessage(command, ctx.language))] };
  }

  return handler(rest, ctx);
}
