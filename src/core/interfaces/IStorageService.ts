/**
 * Contrato de Servicio de Almacenamiento (DIP / LSP).
 * Permite cambiar la implementación (AsyncStorage, SQLite, MMKV, SecureStore)
 * sin afectar las pantallas o hooks de la aplicación.
 */
export interface IStorageService {
  /**
   * Obtiene un valor parseado por su clave.
   */
  get<T>(key: string): Promise<T | null>;

  /**
   * Guarda un valor serializado por su clave.
   */
  set<T>(key: string, value: T): Promise<void>;

  /**
   * Elimina un elemento por su clave.
   */
  remove(key: string): Promise<void>;

  /**
   * Limpia todo el almacenamiento asociado al prefijo de la app.
   */
  clear(): Promise<void>;

  /**
   * Obtiene todas las claves almacenadas.
   */
  getAllKeys(): Promise<readonly string[]>;
}
