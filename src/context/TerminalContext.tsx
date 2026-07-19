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
  commandEntryId: string;
  recordHistory: boolean;
}

const initialState: TerminalState = {
  language: 'en',
  history: [],
  log: [],
};

function commandEntry(id: string, input: string): OutputEntry {
  return { id, kind: 'command', input };
}

function terminalReducer(state: TerminalState, action: ExecuteCommandAction): TerminalState {
  const history = action.recordHistory ? [...state.history, action.input] : state.history;

  if (action.effect?.type === 'clear') {
    return { ...state, history, log: [] };
  }

  const language =
    action.effect?.type === 'set-language' ? action.effect.language : state.language;
  const log = [...state.log, commandEntry(action.commandEntryId, action.input), ...action.entries];

  return { ...state, history, log, language };
}

interface TerminalContextValue extends TerminalState {
  executeLine: (raw: string, options?: { recordHistory?: boolean }) => void;
}

const TerminalContext = createContext<TerminalContextValue | null>(null);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(terminalReducer, initialState);

  const executeLine = useCallback(
    (raw: string, options?: { recordHistory?: boolean }) => {
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
        commandEntryId: crypto.randomUUID(),
        recordHistory: options?.recordHistory ?? true,
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
