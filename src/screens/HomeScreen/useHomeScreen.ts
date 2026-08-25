import { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../../core/types/navigation';
import { storageService } from '../../services/storage/asyncStorageAdapter';
import { useTheme } from '../../theme/useTheme';

export interface SampleItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

const ITEMS_STORAGE_KEY = 'sample_items_list';

/**
 * Hook ViewModel para HomeScreen (SRP - Single Responsibility Principle).
 * Toda la lógica de datos, estado y navegación reside aquí, dejando la vista limpia.
 */
export function useHomeScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const { toggleTheme, isDark, mode } = useTheme();

  const [items, setItems] = useState<SampleItem[]>([]);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      const savedItems = await storageService.get<SampleItem[]>(ITEMS_STORAGE_KEY);
      if (savedItems) {
        setItems(savedItems);
      } else {
        // Datos iniciales de demostración
        const initialItems: SampleItem[] = [
          {
            id: '1',
            title: 'Bienvenido a tu Plantilla',
            description: 'Estructura lista con principios SOLID, Clean Architecture y temas.',
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Componentes Reutilizables',
            description: 'Botones, inputs, tarjetas y encabezados listos para usar.',
            createdAt: new Date().toISOString(),
          },
        ];
        await storageService.set(ITEMS_STORAGE_KEY, initialItems);
        setItems(initialItems);
      }
    } catch (error) {
      console.error('Error al cargar elementos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleAddItem = async () => {
    if (!titleInput.trim()) {
      setInputError('El título es requerido');
      return;
    }
    setInputError('');

    const newItem: SampleItem = {
      id: Date.now().toString(),
      title: titleInput.trim(),
      description: descriptionInput.trim() || 'Sin descripción adicional.',
      createdAt: new Date().toISOString(),
    };

    const updated = [newItem, ...items];
    setItems(updated);
    setTitleInput('');
    setDescriptionInput('');
    await storageService.set(ITEMS_STORAGE_KEY, updated);
  };

  const handleDeleteItem = async (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    await storageService.set(ITEMS_STORAGE_KEY, updated);
  };

  const handleNavigateToDetails = (item: SampleItem) => {
    navigation.navigate('Details', { id: item.id, title: item.title });
  };

  return {
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
    refreshItems: loadItems,
    toggleTheme,
    isDark,
    mode,
  };
}
