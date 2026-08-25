import AsyncStorage from '@react-native-async-storage/async-storage';
import { IStorageService } from '../../core/interfaces/IStorageService';
import { Config } from '../../config/env';

/**
 * Adaptador de almacenamiento que implementa IStorageService usando AsyncStorage.
 * Aplica Inversión de Dependencias (DIP) y Prefijo automático para aislar los datos de la app.
 */
export class AsyncStorageAdapter implements IStorageService {
  private prefix: string;

  constructor(prefix: string = Config.storagePrefix) {
    this.prefix = prefix;
  }

  private formatKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(this.formatKey(key));
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`[StorageService] Error reading key "${key}":`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(this.formatKey(key), jsonValue);
    } catch (error) {
      console.error(`[StorageService] Error writing key "${key}":`, error);
      throw error;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.formatKey(key));
    } catch (error) {
      console.error(`[StorageService] Error removing key "${key}":`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const appKeys = allKeys.filter((k) => k.startsWith(this.prefix));
      if (appKeys.length > 0) {
        await AsyncStorage.multiRemove(appKeys);
      }
    } catch (error) {
      console.error('[StorageService] Error clearing storage:', error);
      throw error;
    }
  }

  async getAllKeys(): Promise<readonly string[]> {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      return allKeys
        .filter((k) => k.startsWith(this.prefix))
        .map((k) => k.replace(this.prefix, ''));
    } catch (error) {
      console.error('[StorageService] Error getting all keys:', error);
      return [];
    }
  }
}

// Instancia singleton por defecto lista para ser inyectada o usada directamente
export const storageService: IStorageService = new AsyncStorageAdapter();
