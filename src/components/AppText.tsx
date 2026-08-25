import React from 'react';
import { Text, TextProps, TextStyle, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'bodyLarge'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'button';

export type TextColorVariant = 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'white';

export interface AppTextProps extends TextProps {
  variant?: TextVariant;
  colorVariant?: TextColorVariant;
  color?: string;
  weight?: TextStyle['fontWeight'];
  align?: TextStyle['textAlign'];
}

/**
 * Componente de texto consistente con la tipografía y paleta del tema.
 */
export const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'body',
  colorVariant = 'primary',
  color,
  weight,
  align,
  style,
  ...rest
}) => {
  const { colors, typography } = useTheme();

  const getTextColor = (): string => {
    if (color) return color;
    switch (colorVariant) {
      case 'secondary':
        return colors.textSecondary;
      case 'muted':
        return colors.textMuted;
      case 'error':
        return colors.error;
      case 'success':
        return colors.success;
      case 'white':
        return colors.white;
      case 'primary':
      default:
        return colors.text;
    }
  };

  const textStyle: TextStyle = {
    ...typography[variant],
    color: getTextColor(),
    ...(weight ? { fontWeight: weight } : {}),
    ...(align ? { textAlign: align } : {}),
  };

  return (
    <Text style={[textStyle, style]} {...rest}>
      {children}
    </Text>
  );
};
