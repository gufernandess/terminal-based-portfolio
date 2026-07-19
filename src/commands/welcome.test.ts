import { describe, expect, it } from 'vitest';
import { welcome } from './welcome';
import { welcomeText } from '../content/misc';

describe('welcome command', () => {
  it('returns the English welcome text', () => {
    const result = welcome([], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({
      kind: 'text',
      lines: welcomeText.en,
    });
  });

  it('returns the Portuguese welcome text', () => {
    const result = welcome([], { language: 'pt', history: [] });
    expect(result.entries[0]).toMatchObject({
      kind: 'text',
      lines: welcomeText.pt,
    });
  });
});
