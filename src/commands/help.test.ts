import { describe, expect, it } from 'vitest';
import { help } from './help';
import { helpEntries } from '../content/misc';

describe('help command', () => {
  it('lists every registered command with a description', () => {
    const result = help([], { language: 'en', history: [] });
    const entry = result.entries[0];
    expect(entry.kind).toBe('list');
    if (entry.kind === 'list') {
      expect(entry.items).toHaveLength(helpEntries.length);
      expect(entry.items[0]).toMatchObject({ label: 'welcome' });
    }
  });

  it('localizes descriptions', () => {
    const result = help([], { language: 'pt', history: [] });
    const entry = result.entries[0];
    if (entry.kind === 'list' && typeof entry.items[0] === 'object') {
      expect(entry.items[0]).toMatchObject({
        label: 'welcome',
        description: 'Mostra a mensagem de boas-vindas',
      });
    }
  });
});
