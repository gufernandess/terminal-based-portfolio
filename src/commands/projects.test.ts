import { describe, expect, it } from 'vitest';
import { projects } from './projects';

describe('projects command', () => {
  it('lists projects when called with no args', () => {
    const result = projects([], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'list', items: ['c3t', 'vertex-cover'] });
    expect(result.effect).toBeUndefined();
  });

  it('returns a usage error when "goto" is missing', () => {
    const result = projects(['c3t'], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'error' });
  });

  it('shows project details and opens the GitHub URL on "goto"', () => {
    const result = projects(['goto', 'c3t'], { language: 'en', history: [] });
    expect(result.entries[0].kind).toBe('text');
    expect(result.effect).toEqual({
      type: 'open-url',
      url: 'https://github.com/gufernandess/c3t',
    });
  });

  it('returns a "not found" error for an unknown project', () => {
    const result = projects(['goto', 'nope'], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'error' });
    expect(result.effect).toBeUndefined();
  });
});
