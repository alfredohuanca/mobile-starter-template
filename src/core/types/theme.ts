export type ThemeMode = 'light' | 'dark' | 'system';

export interface ColorPalette {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  background: string;
  surface: string;
  surfaceElevated: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderSubtle: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  white: string;
  black: string;
  overlay: string;
  cardShadow: string;
}

export interface SpacingTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface RadiusTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface Theme {
  colors: ColorPalette;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  isDark: boolean;
}
