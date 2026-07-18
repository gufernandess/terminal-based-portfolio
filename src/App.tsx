import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { GlobalStyle } from './theme/GlobalStyle';
import { TerminalProvider } from './context/TerminalContext';
import { TerminalWindow } from './terminal/TerminalWindow';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <TerminalProvider>
        <TerminalWindow />
      </TerminalProvider>
    </ThemeProvider>
  );
}
