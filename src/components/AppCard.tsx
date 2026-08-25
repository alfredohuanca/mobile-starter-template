import React, { ReactNode } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '../theme/useTheme';

export type CardVariant = 'elevated' | 'outlined' | 'flat';

export interface AppCardProps {
  children: ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
  onPress?: TouchableOpacityProps['onPress'];
  padding?: number;
}

export const AppCard: React.FC<AppCardProps> = ({
  children,
  variant = 'elevated',
  style,
  onPress,
  padding,
}) => {
  const { colors, spacing, radius, isDark } = useTheme();

  const cardPadding = padding !== undefined ? padding : spacing.md;

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'flat':
        return {
          backgroundColor: isDark ? colors.surfaceElevated : colors.borderSubtle,
        };
      case 'elevated':
      default:
        return {
          backgroundColor: colors.surface,
          shadowColor: colors.cardShadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.3 : 0.06,
          shadowRadius: 8,
          elevation: isDark ? 2 : 3,
          borderWidth: isDark ? 1 : 0,
          borderColor: isDark ? colors.border : 'transparent',
        };
    }
  };

  const containerStyle: ViewStyle = {
    borderRadius: radius.lg,
    padding: cardPadding,
    ...getVariantStyle(),
  };

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[containerStyle, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[containerStyle, style]}>{children}</View>;
};
