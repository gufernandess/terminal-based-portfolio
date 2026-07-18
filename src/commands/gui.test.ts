import { describe, expect, it } from 'vitest';
import { gui } from './gui';

describe('gui command', () => {
  it('opens the graphical portfolio in a new tab', () => {
    const result = gui([], { language: 'en', history: [] });
    expect(result.effect).toEqual({
      type: 'open-url',
      url: 'https://gustavofernandes.netlify.app/',
    });
    expect(result.entries[0].kind).toBe('text');
  });
});
