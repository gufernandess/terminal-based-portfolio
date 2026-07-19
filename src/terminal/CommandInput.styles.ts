import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.comment};
  margin-right: 0.5em;
`;

export const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.foreground};
  font-family: inherit;
  font-size: inherit;
`;
