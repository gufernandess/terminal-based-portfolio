import type { ListItem } from '../types';
import { renderRichText } from './richText';
import { getItemIcon, ItemIconGlyph } from './itemIcons';
import {
  Wrapper,
  Title,
  Items,
  Item,
  Arrow,
  ItemIconWrap,
  Label,
  Description,
  Hint,
} from './ListOutput.styles';

interface ListOutputProps {
  title?: string;
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
      {title ? <Title>{title}</Title> : null}
      <Items>
        {normalized.map((item, index) => {
          const icon = getItemIcon(item.label);
          return (
            <Item key={`${index}-${item.label}`}>
              <Arrow>→</Arrow>
              {icon ? (
                <ItemIconWrap aria-hidden="true">
                  <ItemIconGlyph icon={icon} />
                </ItemIconWrap>
              ) : null}
              <Label>{item.label}{item.description ? ':' : ''}</Label>
              {item.description ? (
                <Description>{renderRichText(item.description)}</Description>
              ) : null}
            </Item>
          );
        })}
      </Items>
      {hint ? <Hint>{renderRichText(hint)}</Hint> : null}
    </Wrapper>
  );
}
