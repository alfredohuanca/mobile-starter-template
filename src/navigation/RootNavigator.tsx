import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../core/types/navigation';
import { ROUTES } from './routes';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { useTheme } from '../theme/useTheme';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Navegador Raíz de la Aplicación.
 * Integra tema dinámico para el contenedor de navegación y transiciones nativas.
 */
export const RootNavigator: React.FC = () => {
  const { colors, isDark } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          notification: colors.error,
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '700',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '900',
          },
        },
      }}
    >
      <Stack.Navigator
        initialRouteName={ROUTES.HOME}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
        <Stack.Screen name={ROUTES.DETAILS} component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
