import { describe, expect, it } from 'vitest';
import { career } from './career';

describe('career command', () => {
  it('lists companies when called with no args', () => {
    const result = career([], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({
      kind: 'list',
      items: ['nextpage', 'jit-technology', 'tropa-concursos', 'shotokawa-comics', 'gera3-sistemas'],
    });
  });

  it('shows a company detail by exact slug', () => {
    const result = career(['nextpage'], { language: 'en', history: [] });
    const entry = result.entries[0];
    expect(entry.kind).toBe('text');
    if (entry.kind === 'text') {
      expect(entry.lines[0]).toBe('NextPage — Remote');
    }
  });

  it('matches free text with spaces standing in for hyphens', () => {
    const result = career(['jit', 'technology'], { language: 'en', history: [] });
    expect(result.entries[0].kind).toBe('text');
  });

  it('returns a "not found" error for an unknown company', () => {
    const result = career(['nowhere'], { language: 'pt', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'error' });
  });
});
