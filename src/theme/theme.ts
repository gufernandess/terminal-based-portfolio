import 'styled-components';
import { colors, fontFamily } from './tokens';

export const theme = {
  colors,
  fontFamily,
};

export type AppTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
