import type { OutputEntry } from '../types';
import { ListOutput } from './ListOutput';
import { TagList } from './TagList';
import { renderRichText } from './richText';
import { PROMPT } from '../content/prompt';
import { CommandRow, Prompt, CommandText, TextBlock, ErrorBlock } from './OutputLine.styles';

interface OutputLineProps {
  entry: OutputEntry;
}

export function OutputLine({ entry }: OutputLineProps) {
  switch (entry.kind) {
    case 'command':
      return (
        <CommandRow>
          <Prompt>{PROMPT}</Prompt>
          <CommandText>{entry.input}</CommandText>
        </CommandRow>
      );
    case 'text':
      return (
        <TextBlock>
          {entry.lines.map((line, index) => (
            <div key={index}>{line === '' ? ' ' : renderRichText(line)}</div>
          ))}
        </TextBlock>
      );
    case 'error':
      return <ErrorBlock>{entry.message}</ErrorBlock>;
    case 'list':
      return <ListOutput title={entry.title} items={entry.items} hint={entry.hint} />;
    case 'tags':
      return <TagList items={entry.items} />;
    default:
      return null;
  }
}
