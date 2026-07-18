import { describe, expect, it } from 'vitest';
import { education } from './education';

describe('education command', () => {
  it('returns the education text block', () => {
    const result = education([], { language: 'en', history: [] });
    const entry = result.entries[0];
    expect(entry.kind).toBe('text');
    if (entry.kind === 'text') {
      expect(entry.lines[0]).toBe('Federal University of Ceará (UFC) — Quixadá, CE, Brazil');
    }
  });

  it('returns the Portuguese education text block', () => {
    const result = education([], { language: 'pt', history: [] });
    const entry = result.entries[0];
    if (entry.kind === 'text') {
      expect(entry.lines[0]).toBe('Universidade Federal do Ceará (UFC) — Quixadá, CE, Brasil');
    }
  });
});
