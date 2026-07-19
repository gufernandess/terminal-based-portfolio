import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0.5em 0;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.cyan};
  margin-bottom: 0.25em;
`;

export const Items = styled.div`
  margin: 0.5em 0;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1em;
`;

export const Arrow = styled.span`
  color: ${({ theme }) => theme.colors.comment};
  margin-right: 0.5em;
`;

export const ItemIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 0.4em;
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.yellow};
`;

export const Description = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
  margin-left: 1em;
`;

export const Hint = styled.div`
  color: ${({ theme }) => theme.colors.comment};
  margin-top: 0.5em;
`;
