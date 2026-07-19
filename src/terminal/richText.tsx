import { Link, Highlight } from './richText.styles';

const URL_PATTERN = /https?:\/\/\S+/g;
const HIGHLIGHT_PATTERN = /\*\*(.+?)\*\*/g;

function renderLinks(text: string, keyPrefix: string) {
  const parts = text.split(URL_PATTERN);
  const urls = text.match(URL_PATTERN) ?? [];

  return parts.flatMap((part, index) => {
    const url = urls[index];
    if (url === undefined) return part === '' ? [] : [part];
    return [
      part,
      <Link key={`${keyPrefix}-${index}`} href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </Link>,
    ];
  });
}

export function renderRichText(line: string) {
  const segments = line.split(HIGHLIGHT_PATTERN);

  return segments.flatMap((segment, index) => {
    const keyPrefix = `seg-${index}`;
    if (index % 2 === 1) {
      return [<Highlight key={keyPrefix}>{segment}</Highlight>];
    }
    return renderLinks(segment, keyPrefix);
  });
}
