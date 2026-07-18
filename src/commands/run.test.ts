import { describe, expect, it } from 'vitest';
import { runCommand } from './run';

describe('runCommand', () => {
  it('returns null for blank input', () => {
    expect(runCommand('   ', { language: 'en', history: [] })).toBeNull();
  });

  it('returns a "command not found" error in English', () => {
    const result = runCommand('doesnotexist', { language: 'en', history: [] });
    expect(result?.entries[0]).toMatchObject({
      kind: 'error',
      message: 'command not found: doesnotexist',
    });
  });

  it('returns a "comando não encontrado" error in Portuguese', () => {
    const result = runCommand('doesnotexist', { language: 'pt', history: [] });
    expect(result?.entries[0]).toMatchObject({
      kind: 'error',
      message: 'comando não encontrado: doesnotexist',
    });
  });

  it('dispatches to the matching handler, case-insensitively', () => {
    const result = runCommand('ECHO hello world', { language: 'en', history: [] });
    expect(result?.entries[0]).toMatchObject({ kind: 'text', lines: ['hello world'] });
  });
});
