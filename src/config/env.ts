/**
 * Configuración global de la aplicación.
 * Centraliza las variables de entorno, nombres de app y constantes.
 */
export const Config = {
  appName: 'Mobile Starter',
  appVersion: '1.0.0',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
  storagePrefix: '@app_starter_',
  isDevelopment: __DEV__,
} as const;

export type AppConfig = typeof Config;
