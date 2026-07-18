import { describe, expect, it } from 'vitest';
import { echo } from './echo';

describe('echo command', () => {
  it('echoes the given argument', () => {
    const result = echo(['hello', 'world'], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'text', lines: ['hello world'] });
  });

  it('echoes an empty line when called with no args', () => {
    const result = echo([], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'text', lines: [''] });
  });
});
