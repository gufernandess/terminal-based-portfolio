import { createContext, useCallback, useContext, useReducer, type ReactNode } from 'react';
import type { CommandEffect, Language, OutputEntry } from '../types';
import { runCommand } from '../commands/run';

interface TerminalState {
  language: Language;
  history: string[];
  log: OutputEntry[];
}

interface ExecuteCommandAction {
  type: 'EXECUTE_COMMAND';
  input: string;
  entries: OutputEntry[];
  effect?: CommandEffect;
}

const initialState: TerminalState = {
  language: 'en',
  history: [],
  log: [],
};

function commandEntry(input: string): OutputEntry {
  return { id: crypto.randomUUID(), kind: 'command', input };
}

function terminalReducer(state: TerminalState, action: ExecuteCommandAction): TerminalState {
  const history = [...state.history, action.input];

  if (action.effect?.type === 'clear') {
    return { ...state, history, log: [] };
  }

  const language =
    action.effect?.type === 'set-language' ? action.effect.language : state.language;
  const log = [...state.log, commandEntry(action.input), ...action.entries];

  return { ...state, history, log, language };
}

interface TerminalContextValue extends TerminalState {
  executeLine: (raw: string) => void;
}

const TerminalContext = createContext<TerminalContextValue | null>(null);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(terminalReducer, initialState);

  const executeLine = useCallback(
    (raw: string) => {
      const result = runCommand(raw, { language: state.language, history: state.history });
      if (!result) return;

      if (result.effect?.type === 'open-url') {
        window.open(result.effect.url, '_blank', 'noopener,noreferrer');
      }
      if (result.effect?.type === 'mailto') {
        window.location.href = `mailto:${result.effect.address}`;
      }

      dispatch({
        type: 'EXECUTE_COMMAND',
        input: raw,
        entries: result.entries,
        effect: result.effect,
      });
    },
    [state.language, state.history],
  );

  return (
    <TerminalContext.Provider value={{ ...state, executeLine }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal(): TerminalContextValue {
  const ctx = useContext(TerminalContext);
  if (!ctx) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return ctx;
}
