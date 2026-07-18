import { describe, expect, it } from 'vitest';
import { resolveText } from './resolveText';

describe('resolveText', () => {
  const localized = { en: 'hello', pt: 'olá' };

  it('resolves English', () => {
    expect(resolveText(localized, 'en')).toBe('hello');
  });

  it('resolves Portuguese', () => {
    expect(resolveText(localized, 'pt')).toBe('olá');
  });
});
