import { getTechIcon } from './techIcons';
import { Wrapper, Tag } from './TagList.styles';

interface TagListProps {
  items: string[];
}

export function TagList({ items }: TagListProps) {
  return (
    <Wrapper>
      {items.map((item) => {
        const Icon = getTechIcon(item);
        return (
          <Tag key={item}>
            {Icon ? <Icon aria-hidden="true" /> : null}
            {item}
          </Tag>
        );
      })}
    </Wrapper>
  );
}
