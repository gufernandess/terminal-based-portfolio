import { Wrapper, Tag } from './TagList.styles';

interface TagListProps {
  items: string[];
}

export function TagList({ items }: TagListProps) {
  return (
    <Wrapper>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </Wrapper>
  );
}
