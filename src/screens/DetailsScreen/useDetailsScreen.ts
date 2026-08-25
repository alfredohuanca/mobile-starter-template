import { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { DetailsScreenProps, AppNavigationProp } from '../../core/types/navigation';
import { SampleItem } from '../HomeScreen/useHomeScreen';
import { storageService } from '../../services/storage/asyncStorageAdapter';

const ITEMS_STORAGE_KEY = 'sample_items_list';

/**
 * Hook ViewModel para DetailsScreen (SRP).
 */
export function useDetailsScreen() {
  const route = useRoute<DetailsScreenProps['route']>();
  const navigation = useNavigation<AppNavigationProp>();
  const { id } = route.params;

  const [item, setItem] = useState<SampleItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        setLoading(true);
        const allItems = await storageService.get<SampleItem[]>(ITEMS_STORAGE_KEY);
        const found = allItems?.find((i) => i.id === id) || null;
        setItem(found);
      } catch (error) {
        console.error('Error al cargar detalle:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchItemDetails();
  }, [id]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return {
    item,
    loading,
    handleGoBack,
  };
}
