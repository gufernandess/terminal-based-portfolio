import styled from 'styled-components';

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.blue};
  text-decoration: underline;
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.magenta};
`;
