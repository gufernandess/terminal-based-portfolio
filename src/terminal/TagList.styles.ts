import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin: 0.5em 0;
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  padding: 0.15em 0.6em;
  border: 1px solid ${({ theme }) => theme.colors.comment};
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.cyan};
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;
