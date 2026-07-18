import { useState, type KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useTerminal } from '../context/TerminalContext';
import { getCompletions } from '../commands/autocomplete';

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.comment};
  margin-right: 0.5em;
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.foreground};
  font-family: inherit;
  font-size: inherit;
`;

function longestCommonPrefix(values: string[]): string {
  if (values.length === 0) return '';
  return values.reduce((prefix, value) => {
    let i = 0;
    while (i < prefix.length && i < value.length && prefix[i] === value[i]) i += 1;
    return prefix.slice(0, i);
  });
}

export function CommandInput() {
  const { history, executeLine } = useTerminal();
  const [value, setValue] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      const raw = value;
      setValue('');
      setHistoryIndex(null);
      executeLine(raw);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setValue(history[nextIndex]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setValue('');
      } else {
        setHistoryIndex(nextIndex);
        setValue(history[nextIndex]);
      }
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const completions = getCompletions(value);
      if (completions.length === 0) return;

      // Tokenize the same way getCompletions does (raw value, not trimmed) so
      // the "last token" here always matches the prefix completions were computed from.
      const tokens = value.split(/\s+/);
      const lastToken = tokens[tokens.length - 1] ?? '';

      if (completions.length === 1) {
        tokens[tokens.length - 1] = completions[0];
        setValue(`${tokens.join(' ')} `);
        return;
      }

      const commonPrefix = longestCommonPrefix(completions);
      if (commonPrefix.length > lastToken.length) {
        tokens[tokens.length - 1] = commonPrefix;
        setValue(tokens.join(' '));
      }
    }
  }

  return (
    <Row>
      <Prompt>guest@gustavo:~$</Prompt>
      <Input
        autoFocus
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        aria-label="terminal command input"
      />
    </Row>
  );
}
