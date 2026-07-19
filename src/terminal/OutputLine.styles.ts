import styled from 'styled-components';

export const CommandRow = styled.div`
  margin-top: 1em;
`;

export const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.comment};
  margin-right: 0.5em;
`;

export const CommandText = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
`;

export const TextBlock = styled.div`
  white-space: pre-wrap;
  margin: 0.5em 0;
`;

export const ErrorBlock = styled.div`
  color: ${({ theme }) => theme.colors.red};
  margin: 0.5em 0;
`;
