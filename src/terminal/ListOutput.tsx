import styled from 'styled-components';
import type { ListItem } from '../types';

const Wrapper = styled.div`
  margin: 0.5em 0;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.cyan};
`;

const Items = styled.div`
  margin: 0.5em 0;
`;

const Item = styled.div`
  padding-left: 1em;
`;

const Arrow = styled.span`
  color: ${({ theme }) => theme.colors.comment};
  margin-right: 0.5em;
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.yellow};
`;

const Description = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
  margin-left: 1em;
`;

const Hint = styled.div`
  color: ${({ theme }) => theme.colors.comment};
`;

interface ListOutputProps {
  title: string;
  items: string[] | ListItem[];
  hint?: string;
}

function isListItemArray(items: string[] | ListItem[]): items is ListItem[] {
  return items.length > 0 && typeof items[0] === 'object';
}

export function ListOutput({ title, items, hint }: ListOutputProps) {
  const normalized: ListItem[] = isListItemArray(items)
    ? items
    : items.map((label) => ({ label }));

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Items>
        {normalized.map((item, index) => (
          <Item key={`${index}-${item.label}`}>
            <Arrow>→</Arrow>
            <Label>{item.label}</Label>
            {item.description ? <Description>{item.description}</Description> : null}
          </Item>
        ))}
      </Items>
      {hint ? <Hint>{hint}</Hint> : null}
    </Wrapper>
  );
}
