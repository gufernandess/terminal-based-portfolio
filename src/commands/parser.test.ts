import { describe, expect, it } from 'vitest';
import { parseInput } from './parser';

describe('parseInput', () => {
  it('splits command and args on whitespace', () => {
    expect(parseInput('career jit-technology')).toEqual({
      command: 'career',
      rest: ['jit-technology'],
    });
  });

  it('lowercases the command but preserves arg casing', () => {
    expect(parseInput('ECHO Hello World')).toEqual({
      command: 'echo',
      rest: ['Hello', 'World'],
    });
  });

  it('collapses repeated whitespace', () => {
    expect(parseInput('  projects   goto   c3t  ')).toEqual({
      command: 'projects',
      rest: ['goto', 'c3t'],
    });
  });

  it('returns an empty command for blank input', () => {
    expect(parseInput('   ')).toEqual({ command: '', rest: [] });
  });

  it('returns no rest for a bare command', () => {
    expect(parseInput('help')).toEqual({ command: 'help', rest: [] });
  });
});
