import type { CommandHandler } from '../types';
import { textEntry } from './entries';

export const echo: CommandHandler = (args) => ({ entries: [textEntry([args.join(' ')])] });
