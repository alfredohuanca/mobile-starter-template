/**
 * Tipos de utilidad comunes en aplicaciones móviles.
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}
