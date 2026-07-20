import { useEffect, useRef } from 'react';
import { useTerminal } from '../context/TerminalContext';
import { OutputLine } from './OutputLine';
import { CommandInput } from './CommandInput';
import { Window } from './TerminalWindow.styles';

export function TerminalWindow() {
  const { log, executeLine } = useTerminal();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasRunWelcome = useRef(false);

  useEffect(() => {
    if (hasRunWelcome.current) return;
    hasRunWelcome.current = true;
    executeLine('welcome', { recordHistory: false, showCommand: false });
  }, [executeLine]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [log]);

  function handleClick() {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  }

  return (
    <Window onClick={handleClick}>
      {log.map((entry) => (
        <OutputLine key={entry.id} entry={entry} />
      ))}
      <CommandInput ref={inputRef} />
      <div ref={bottomRef} />
    </Window>
  );
}
