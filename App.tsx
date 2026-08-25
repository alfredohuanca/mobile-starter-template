import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme';
import { RootNavigator } from './src/navigation';

/**
 * Punto de entrada principal de la aplicación.
 * Orquesta los proveedores globales (SafeArea y Tema) y monta el Navegador Raíz.
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
