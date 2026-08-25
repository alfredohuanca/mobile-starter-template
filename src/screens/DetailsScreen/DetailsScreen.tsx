import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDetailsScreen } from './useDetailsScreen';
import {
  ScreenContainer,
  AppHeader,
  AppText,
  AppButton,
  AppCard,
  LoadingOverlay,
} from '../../components';
import { useTheme } from '../../theme/useTheme';

export const DetailsScreen: React.FC = () => {
  const { item, loading, handleGoBack } = useDetailsScreen();
  const { colors, spacing } = useTheme();

  return (
    <ScreenContainer scrollable>
      <AppHeader title="Detalle de Elemento" showBackButton />

      <View style={[styles.content, { padding: spacing.md }]}>
        {item ? (
          <>
            <AppCard variant="elevated" style={styles.card}>
              <View style={styles.badgeRow}>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: colors.borderSubtle },
                  ]}
                >
                  <AppText variant="caption" colorVariant="primary" weight="600">
                    ID: {item.id}
                  </AppText>
                </View>

                <AppText variant="caption" colorVariant="muted">
                  {new Date(item.createdAt).toLocaleString()}
                </AppText>
              </View>

              <AppText variant="h1" style={styles.title}>
                {item.title}
              </AppText>

              <AppText variant="bodyLarge" colorVariant="secondary" style={styles.description}>
                {item.description}
              </AppText>
            </AppCard>

            <AppCard variant="outlined" style={styles.infoCard}>
              <AppText variant="h3" style={styles.infoTitle}>
                Arquitectura Limpia
              </AppText>
              <AppText variant="body" colorVariant="muted" style={styles.infoText}>
                Esta pantalla consume los parámetros de navegación de forma fuertemente tipada con TypeScript, y recupera los datos a través del servicio desacoplado IStorageService.
              </AppText>
            </AppCard>

            <AppButton
              title="Volver al Inicio"
              variant="outline"
              onPress={handleGoBack}
              leftIcon={<Ionicons name="arrow-back" size={18} color={colors.primary} />}
              fullWidth
              style={styles.backBtn}
            />
          </>
        ) : !loading ? (
          <View style={styles.notFoundContainer}>
            <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
            <AppText variant="h3" style={styles.notFoundTitle}>
              Elemento no encontrado
            </AppText>
            <AppButton title="Regresar" onPress={handleGoBack} style={styles.backBtn} />
          </View>
        ) : null}
      </View>

      <LoadingOverlay visible={loading} message="Cargando detalle..." />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  card: {
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  title: {
    marginBottom: 12,
  },
  description: {
    lineHeight: 24,
  },
  infoCard: {
    marginBottom: 24,
  },
  infoTitle: {
    marginBottom: 8,
  },
  infoText: {
    lineHeight: 20,
  },
  backBtn: {
    marginTop: 8,
  },
  notFoundContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  notFoundTitle: {
    marginVertical: 16,
  },
});
