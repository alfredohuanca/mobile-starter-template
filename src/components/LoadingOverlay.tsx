import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { useTheme } from '../theme/useTheme';
import { AppText } from './AppText';

export interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  fullscreen?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message,
  fullscreen = false,
}) => {
  const { colors, spacing, radius } = useTheme();

  if (!visible) return null;

  const content = (
    <View style={[styles.container, fullscreen && { backgroundColor: colors.overlay }]}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderRadius: radius.lg,
            padding: spacing.lg,
          },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        {message && (
          <AppText variant="body" style={styles.message} weight="500">
            {message}
          </AppText>
        )}
      </View>
    </View>
  );

  if (fullscreen) {
    return (
      <Modal transparent visible={visible} animationType="fade">
        {content}
      </Modal>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  message: {
    marginTop: 12,
    textAlign: 'center',
  },
});
