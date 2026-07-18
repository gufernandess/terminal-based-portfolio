import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    margin: 0;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: 16px;
  }

  /* Tablet */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  /* Celular */
  @media (max-width: 480px) {
    body {
      font-size: 13px;
    }
  }
`;
