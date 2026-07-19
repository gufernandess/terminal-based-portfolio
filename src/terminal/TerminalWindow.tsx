import { useEffect, useRef } from 'react';
import { useTerminal } from '../context/TerminalContext';
import { OutputLine } from './OutputLine';
import { CommandInput } from './CommandInput';
import { Window } from './TerminalWindow.styles';

export function TerminalWindow() {
  const { log, executeLine } = useTerminal();
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasRunWelcome = useRef(false);

  useEffect(() => {
    if (hasRunWelcome.current) return;
    hasRunWelcome.current = true;
    executeLine('welcome', { recordHistory: false, showCommand: false });
  }, [executeLine]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [log]);

  return (
    <Window>
      {log.map((entry) => (
        <OutputLine key={entry.id} entry={entry} />
      ))}
      <CommandInput />
      <div ref={bottomRef} />
    </Window>
  );
}
