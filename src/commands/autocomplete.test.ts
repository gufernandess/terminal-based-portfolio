import { describe, expect, it } from 'vitest';
import { getCompletions } from './autocomplete';

describe('getCompletions', () => {
  it('completes a unique command prefix', () => {
    expect(getCompletions('hel')).toEqual(['help']);
  });

  it('returns every command for an empty prefix', () => {
    expect(getCompletions('')).toContain('career');
  });

  it('completes fixed subcommands for a known command', () => {
    expect(getCompletions('about sk')).toEqual(['skills']);
  });

  it('returns no completions for free-text arguments', () => {
    expect(getCompletions('career jit')).toEqual([]);
  });

  it('returns multiple candidates sharing a command prefix', () => {
    expect(getCompletions('about ')).toEqual([
      'skills',
      'workspace',
      'hobbies',
      'languages',
      'all',
    ]);
  });
});
