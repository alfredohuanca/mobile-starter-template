import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useHomeScreen, SampleItem } from './useHomeScreen';
import {
  ScreenContainer,
  AppHeader,
  AppText,
  AppButton,
  AppTextInput,
  AppCard,
  LoadingOverlay,
} from '../../components';
import { useTheme } from '../../theme/useTheme';

export const HomeScreen: React.FC = () => {
  const {
    items,
    loading,
    titleInput,
    setTitleInput,
    descriptionInput,
    setDescriptionInput,
    inputError,
    handleAddItem,
    handleDeleteItem,
    handleNavigateToDetails,
    refreshItems,
    toggleTheme,
    isDark,
  } = useHomeScreen();

  const { colors, spacing } = useTheme();

  const renderItem = ({ item }: { item: SampleItem }) => (
    <AppCard
      variant="elevated"
      style={styles.itemCard}
      onPress={() => handleNavigateToDetails(item)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardInfo}>
          <AppText variant="h3" numberOfLines={1}>
            {item.title}
          </AppText>
          <AppText variant="bodySmall" colorVariant="muted" style={styles.dateText}>
            {new Date(item.createdAt).toLocaleDateString()}
          </AppText>
        </View>
        <TouchableOpacity
          onPress={() => handleDeleteItem(item.id)}
          style={styles.deleteButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="trash-outline" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>

      <AppText variant="body" colorVariant="secondary" style={styles.descText}>
        {item.description}
      </AppText>

      <View style={styles.cardFooter}>
        <AppText variant="caption" colorVariant="primary" weight="600">
          Ver detalles →
        </AppText>
      </View>
    </AppCard>
  );

  return (
    <ScreenContainer>
      <AppHeader
        title="Plantilla Base"
        subtitle="Arquitectura Limpia & SOLID"
        rightAction={
          <TouchableOpacity
            onPress={toggleTheme}
            style={[styles.themeButton, { backgroundColor: colors.surface }]}
          >
            <Ionicons
              name={isDark ? 'sunny' : 'moon'}
              size={20}
              color={isDark ? '#FBBF24' : colors.primary}
            />
          </TouchableOpacity>
        }
      />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.listContent, { padding: spacing.md }]}
        refreshing={loading}
        onRefresh={refreshItems}
        ListHeaderComponent={
          <AppCard variant="outlined" style={styles.formCard}>
            <AppText variant="h3" style={styles.formTitle}>
              Nuevo Registro
            </AppText>

            <AppTextInput
              label="Título"
              placeholder="Ej: Mi primera tarea..."
              value={titleInput}
              onChangeText={setTitleInput}
              error={inputError}
              leftIcon={<Ionicons name="bookmark-outline" size={20} color={colors.textMuted} />}
            />

            <AppTextInput
              label="Descripción"
              placeholder="Detalle o notas..."
              value={descriptionInput}
              onChangeText={setDescriptionInput}
              leftIcon={<Ionicons name="document-text-outline" size={20} color={colors.textMuted} />}
            />

            <AppButton
              title="Guardar Registro"
              onPress={handleAddItem}
              leftIcon={<Ionicons name="add-circle-outline" size={20} color="#FFF" />}
              fullWidth
            />
          </AppCard>
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="file-tray-outline" size={48} color={colors.textMuted} />
              <AppText variant="body" colorVariant="muted" style={styles.emptyText}>
                No hay elementos registrados. Agrega uno arriba.
              </AppText>
            </View>
          ) : null
        }
      />

      <LoadingOverlay visible={loading && items.length === 0} message="Cargando..." />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 40,
  },
  themeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formCard: {
    marginBottom: 20,
  },
  formTitle: {
    marginBottom: 16,
  },
  itemCard: {
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInfo: {
    flex: 1,
  },
  dateText: {
    marginTop: 2,
  },
  deleteButton: {
    padding: 4,
    marginLeft: 8,
  },
  descText: {
    marginTop: 8,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 12,
    textAlign: 'center',
  },
});
