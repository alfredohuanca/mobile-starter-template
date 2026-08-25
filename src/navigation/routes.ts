/**
 * Constantes de rutas de navegación.
 * Evita strings mágicos ("Home", "Details") a lo largo de la app.
 */
export const ROUTES = {
  HOME: 'Home',
  DETAILS: 'Details',
} as const;

export type AppRoutes = typeof ROUTES[keyof typeof ROUTES];
