import React, { createContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { Theme, ThemeMode } from '../core/types/theme';
import { lightColors, darkColors } from './colors';
import { spacing, radius } from './spacing';
import { typography } from './typography';
import { storageService } from '../services/storage/asyncStorageAdapter';

const THEME_STORAGE_KEY = 'app_theme_mode';

interface ThemeContextType {
  theme: Theme;
  colors: Theme['colors'];
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  isDark: boolean;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');

  useEffect(() => {
    // Cargar preferencia persistida
    storageService.get<ThemeMode>(THEME_STORAGE_KEY).then((savedMode) => {
      if (savedMode) setModeState(savedMode);
    });
  }, []);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    storageService.set(THEME_STORAGE_KEY, newMode);
  };

  const toggleTheme = () => {
    const nextMode: ThemeMode = isDark ? 'light' : 'dark';
    setMode(nextMode);
  };

  const isDark = useMemo(() => {
    if (mode === 'dark') return true;
    if (mode === 'light') return false;
    return systemColorScheme === 'dark';
  }, [mode, systemColorScheme]);

  const theme: Theme = useMemo(
    () => ({
      colors: isDark ? darkColors : lightColors,
      spacing,
      radius,
      isDark,
    }),
    [isDark]
  );

  const value: ThemeContextType = useMemo(
    () => ({
      theme,
      colors: theme.colors,
      spacing,
      radius,
      typography,
      isDark,
      mode,
      setMode,
      toggleTheme,
    }),
    [theme, isDark, mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
