import styled from 'styled-components';
import type { OutputEntry } from '../types';
import { ListOutput } from './ListOutput';

const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.comment};
`;

const CommandText = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
`;

const TextBlock = styled.div`
  white-space: pre-wrap;
`;

const ErrorBlock = styled.div`
  color: ${({ theme }) => theme.colors.red};
`;

interface OutputLineProps {
  entry: OutputEntry;
}

export function OutputLine({ entry }: OutputLineProps) {
  switch (entry.kind) {
    case 'command':
      return (
        <div>
          <Prompt>guest@gustavo:~$ </Prompt>
          <CommandText>{entry.input}</CommandText>
        </div>
      );
    case 'text':
      return <TextBlock>{entry.lines.join('\n')}</TextBlock>;
    case 'error':
      return <ErrorBlock>{entry.message}</ErrorBlock>;
    case 'list':
      return <ListOutput title={entry.title} items={entry.items} hint={entry.hint} />;
    default:
      return null;
  }
}
