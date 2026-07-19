import type { ReactNode } from 'react';
import { Link, Highlight } from './richText.styles';

const LINKABLE_PATTERN = /((?:https?:\/\/\S+)|(?:[\w.+-]+@[\w-]+\.[\w.-]+))/g;
const HIGHLIGHT_PATTERN = /\*\*(.+?)\*\*/g;
const URL_TEST = /^https?:\/\//;
const EMAIL_TEST = /^[\w.+-]+@[\w-]+\.[\w.-]+$/;

function renderLinks(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(LINKABLE_PATTERN);

  return parts.flatMap((part, index): ReactNode[] => {
    if (!part) return [];

    const isUrl = URL_TEST.test(part);
    const isEmail = EMAIL_TEST.test(part);
    if (!isUrl && !isEmail) return [part];

    const href = isUrl ? part : `mailto:${part}`;
    const newTabProps = isUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return [
      <Link key={`${keyPrefix}-${index}`} href={href} {...newTabProps}>
        {part}
      </Link>,
    ];
  });
}

export function renderRichText(line: string): ReactNode[] {
  const segments = line.split(HIGHLIGHT_PATTERN);

  return segments.flatMap((segment, index): ReactNode[] => {
    const keyPrefix = `seg-${index}`;
    if (index % 2 === 1) {
      return [<Highlight key={keyPrefix}>{segment}</Highlight>];
    }
    return renderLinks(segment, keyPrefix);
  });
}
