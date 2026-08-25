import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme/useTheme';
import { AppText } from './AppText';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonColorVariant = 'primary' | 'secondary' | 'error' | 'success';

export interface AppButtonProps extends Omit<TouchableOpacityProps, 'children'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  colorVariant?: ButtonColorVariant;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  haptic?: boolean;
  fullWidth?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'solid',
  size = 'md',
  colorVariant = 'primary',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  haptic = true,
  fullWidth = false,
  style,
  onPress,
  ...rest
}) => {
  const { colors, spacing, radius } = useTheme();

  const handlePress = (e: any) => {
    if (disabled || loading) return;
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    onPress?.(e);
  };

  const getMainColor = () => {
    switch (colorVariant) {
      case 'secondary':
        return colors.secondary;
      case 'error':
        return colors.error;
      case 'success':
        return colors.success;
      case 'primary':
      default:
        return colors.primary;
    }
  };

  const mainColor = getMainColor();

  const getContainerStyle = (): ViewStyle => {
    let paddingVertical = spacing.sm;
    let paddingHorizontal = spacing.md;
    let minHeight = 44;

    if (size === 'sm') {
      paddingVertical = spacing.xs + 2;
      paddingHorizontal = spacing.sm + 4;
      minHeight = 36;
    } else if (size === 'lg') {
      paddingVertical = spacing.md;
      paddingHorizontal = spacing.lg;
      minHeight = 52;
    }

    const baseStyle: ViewStyle = {
      paddingVertical,
      paddingHorizontal,
      minHeight,
      borderRadius: radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      opacity: disabled ? 0.5 : 1,
      width: fullWidth ? '100%' : undefined,
    };

    switch (variant) {
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: mainColor,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      case 'solid':
      default:
        return {
          ...baseStyle,
          backgroundColor: mainColor,
        };
    }
  };

  const getTextColor = (): string => {
    if (variant === 'solid') return colors.white;
    return mainColor;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || loading}
      onPress={handlePress}
      style={[getContainerStyle(), style as ViewStyle]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <View style={styles.contentRow}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <AppText
            variant={size === 'sm' ? 'bodySmall' : 'button'}
            style={{ color: getTextColor() }}
            weight="600"
          >
            {title}
          </AppText>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
