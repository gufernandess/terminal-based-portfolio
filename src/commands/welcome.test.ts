import { describe, expect, it } from 'vitest';
import { welcome } from './welcome';

describe('welcome command', () => {
  it('returns the English welcome text', () => {
    const result = welcome([], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({
      kind: 'text',
      lines: [
        'Welcome to my terminal portfolio.',
        'Type "help" to see available commands, or "about" to start.',
      ],
    });
  });

  it('returns the Portuguese welcome text', () => {
    const result = welcome([], { language: 'pt', history: [] });
    expect(result.entries[0]).toMatchObject({
      kind: 'text',
      lines: [
        'Bem-vindo ao meu portfólio em formato de terminal.',
        'Digite "help" para ver os comandos disponíveis, ou "about" para começar.',
      ],
    });
  });
});
