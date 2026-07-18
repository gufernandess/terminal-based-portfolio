import { describe, expect, it } from 'vitest';
import { language } from './language';

describe('language command', () => {
  it('switches to Portuguese and confirms in Portuguese', () => {
    const result = language(['portuguese'], { language: 'en', history: [] });
    expect(result.effect).toEqual({ type: 'set-language', language: 'pt' });
    expect(result.entries[0]).toMatchObject({
      kind: 'text',
      lines: ['Idioma definido para português.'],
    });
  });

  it('switches to English and confirms in English', () => {
    const result = language(['english'], { language: 'pt', history: [] });
    expect(result.effect).toEqual({ type: 'set-language', language: 'en' });
    expect(result.entries[0]).toMatchObject({ kind: 'text', lines: ['Language set to English.'] });
  });

  it('is case-insensitive', () => {
    const result = language(['PORTUGUESE'], { language: 'en', history: [] });
    expect(result.effect).toEqual({ type: 'set-language', language: 'pt' });
  });

  it('returns a usage error for an unrecognized argument', () => {
    const result = language(['french'], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'error' });
    expect(result.effect).toBeUndefined();
  });
});
