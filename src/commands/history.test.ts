import { describe, expect, it } from 'vitest';
import { history } from './history';

describe('history command', () => {
  it('lists prior commands from context in order', () => {
    const result = history([], { language: 'en', history: ['welcome', 'about', 'help'] });
    expect(result.entries[0]).toMatchObject({ kind: 'list', items: ['welcome', 'about', 'help'] });
  });

  it('shows an empty list when no commands have run yet', () => {
    const result = history([], { language: 'pt', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'list', items: [] });
  });
});
