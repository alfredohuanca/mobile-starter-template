import React, { ReactNode } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/useTheme';
import { AppText } from './AppText';

export interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: ReactNode;
  centerTitle?: boolean;
  style?: ViewStyle;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  rightAction,
  centerTitle = false,
  style,
}) => {
  const navigation = useNavigation();
  const { colors, spacing } = useTheme();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm + 4,
          borderBottomColor: colors.borderSubtle,
        },
        style,
      ]}
    >
      <View style={styles.leftRow}>
        {showBackButton && (
          <TouchableOpacity
            onPress={handleBack}
            style={[styles.backButton, { backgroundColor: colors.surface }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </TouchableOpacity>
        )}

        <View style={[styles.titleContainer, centerTitle && styles.centerAligned]}>
          <AppText variant="h2" weight="700" numberOfLines={1}>
            {title}
          </AppText>
          {subtitle && (
            <AppText variant="caption" colorVariant="muted" numberOfLines={1}>
              {subtitle}
            </AppText>
          )}
        </View>
      </View>

      {rightAction && <View style={styles.rightAction}>{rightAction}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  centerAligned: {
    alignItems: 'center',
  },
  rightAction: {
    marginLeft: 12,
  },
});
