import { describe, expect, it } from 'vitest';
import { papers } from './papers';

describe('papers command', () => {
  it('lists available papers when called with no args', () => {
    const result = papers([], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({
      kind: 'list',
      items: ['vertex-cover-snarks', 'genetic-algorithms'],
    });
  });

  it('shows a paper detail by exact slug', () => {
    const result = papers(['genetic-algorithms'], { language: 'en', history: [] });
    const entry = result.entries[0];
    expect(entry.kind).toBe('text');
    if (entry.kind === 'text') {
      expect(entry.lines[0]).toBe('A Study on Genetic Algorithms');
    }
  });

  it('matches free text with spaces standing in for hyphens', () => {
    const result = papers(['Vertex', 'Cover', 'Snarks'], { language: 'en', history: [] });
    expect(result.entries[0].kind).toBe('text');
  });

  it('returns a "not found" error for an unknown paper', () => {
    const result = papers(['unknown-paper'], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'error' });
  });
});
