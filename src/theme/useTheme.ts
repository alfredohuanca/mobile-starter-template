import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

/**
 * Hook para acceder a los colores, espaciados, tipografías y controles de tema.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
