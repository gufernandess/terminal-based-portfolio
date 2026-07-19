import { describe, expect, it } from 'vitest';
import { cv } from './cv';

describe('cv command', () => {
  it('opens the English resume PDF when language is English', () => {
    const result = cv([], { language: 'en', history: [] });
    expect(result.effect).toMatchObject({ type: 'open-url' });
    if (result.effect?.type === 'open-url') {
      expect(result.effect.url).toContain('692ce2072ccadcd7ce74e608');
    }
    expect(result.entries[0].kind).toBe('text');
  });

  it('opens the Portuguese resume PDF when language is Portuguese', () => {
    const result = cv([], { language: 'pt', history: [] });
    expect(result.effect).toMatchObject({ type: 'open-url' });
    if (result.effect?.type === 'open-url') {
      expect(result.effect.url).toContain('692cb4d4050b55a9d5767208');
    }
  });
});
