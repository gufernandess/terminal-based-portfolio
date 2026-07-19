import { describe, expect, it } from 'vitest';
import { contacts } from './contacts';

describe('contacts command', () => {
  it('lists contacts when called with no args', () => {
    const result = contacts([], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({
      kind: 'list',
      items: ['linkedin', 'github', 'lattes', 'email'],
    });
  });

  it('opens LinkedIn in a new tab via "contacts linkedin"', () => {
    const result = contacts(['linkedin'], { language: 'en', history: [] });
    expect(result.effect).toEqual({
      type: 'open-url',
      url: 'https://www.linkedin.com/in/gustafernandes/',
    });
  });

  it('uses mailto for "contacts email" instead of opening a new tab', () => {
    const result = contacts(['email'], { language: 'en', history: [] });
    expect(result.effect).toEqual({ type: 'mailto', address: 'gustavofernandescc@gmail.com' });
  });

  it('returns a "not found" error for an unknown contact', () => {
    const result = contacts(['twitter'], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'error' });
  });
});
