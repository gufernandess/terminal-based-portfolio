import type { CommandHandler } from '../types';

export const clear: CommandHandler = () => ({ entries: [], effect: { type: 'clear' } });
