import React, { ReactNode } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../theme/useTheme';

export interface ScreenContainerProps {
  children: ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  withSafeArea?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

/**
 * Contenedor base para todas las pantallas.
 * Integra SafeAreaView, StatusBar reactivo al tema, ScrollView opcional y fondo automático.
 */
export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = false,
  style,
  contentContainerStyle,
  withSafeArea = true,
  edges = ['top', 'bottom', 'left', 'right'],
}) => {
  const { colors, isDark } = useTheme();

  const ContainerComponent = withSafeArea ? SafeAreaView : View;

  return (
    <ContainerComponent
      edges={withSafeArea ? edges : undefined}
      style={[styles.container, { backgroundColor: colors.background }, style]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        {scrollable ? (
          <ScrollView
            contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.flex, contentContainerStyle]}>{children}</View>
        )}
      </KeyboardAvoidingView>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
