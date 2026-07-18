import { describe, expect, it } from 'vitest';
import { clear } from './clear';

describe('clear command', () => {
  it('returns no entries and a clear effect', () => {
    const result = clear([], { language: 'en', history: [] });
    expect(result).toEqual({ entries: [], effect: { type: 'clear' } });
  });
});
