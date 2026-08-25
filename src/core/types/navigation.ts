import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Parámetros de las rutas de la aplicación.
 * Define fuertemente qué parámetros acepta cada pantalla.
 */
export type RootStackParamList = {
  Home: undefined;
  Details: { id: string; title?: string };
};

// Props tipados para componentes de pantalla
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

// Props de navegación reutilizables
export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;
