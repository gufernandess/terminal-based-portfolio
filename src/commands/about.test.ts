import { describe, expect, it } from 'vitest';
import { about } from './about';

describe('about command', () => {
  it('shows the bio and the subcommand menu when called with no args', () => {
    const result = about([], { language: 'en', history: [] });
    expect(result.entries).toHaveLength(2);
    expect(result.entries[0].kind).toBe('text');
    expect(result.entries[1].kind).toBe('list');
  });

  it('shows skills for "about skills"', () => {
    const result = about(['skills'], { language: 'en', history: [] });
    const entry = result.entries[0];
    expect(entry).toMatchObject({ kind: 'list', title: 'gustavo.skills' });
    if (entry.kind === 'list') {
      expect(entry.items).toContain('TypeScript');
    }
  });

  it('localizes hobbies by language', () => {
    const en = about(['hobbies'], { language: 'en', history: [] });
    const pt = about(['hobbies'], { language: 'pt', history: [] });
    expect(en.entries[0]).toMatchObject({ items: ['Reading', 'Gym', 'Running', 'Coding'] });
    expect(pt.entries[0]).toMatchObject({
      items: ['Leitura', 'Academia', 'Corrida', 'Programação'],
    });
  });

  it('returns an error for an unknown subcommand', () => {
    const result = about(['nope'], { language: 'en', history: [] });
    expect(result.entries[0].kind).toBe('error');
  });
});
