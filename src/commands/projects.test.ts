import { describe, expect, it } from 'vitest';
import { projects } from './projects';

describe('projects command', () => {
  it('lists projects when called with no args', () => {
    const result = projects([], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'list', items: ['c3t', 'vertex-cover'] });
    expect(result.effect).toBeUndefined();
  });

  it('shows project details by exact slug, with no redirect effect', () => {
    const result = projects(['c3t'], { language: 'en', history: [] });
    expect(result.entries[0].kind).toBe('text');
    expect(result.effect).toBeUndefined();
  });

  it('matches free text with spaces standing in for hyphens', () => {
    const result = projects(['vertex', 'cover'], { language: 'en', history: [] });
    expect(result.entries[0].kind).toBe('text');
  });

  it('returns a "not found" error for an unknown project', () => {
    const result = projects(['nope'], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'error' });
    expect(result.effect).toBeUndefined();
  });
});
