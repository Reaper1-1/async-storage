import type { AsyncStorage } from "./AsyncStorage";
import { AsyncStorageError } from "./AsyncStorageError";
import IndexedDBStorage from "./web-module/IndexedDBStorage";

class AsyncStorageWebImpl implements AsyncStorage {
  private db: IndexedDBStorage;

  constructor(dbName: string) {
    this.db = new IndexedDBStorage(dbName);
  }

  getItem = async (key: string): Promise<string | null> => {
    try {
      const result = await this.db.getValues([key]);
      const value = result?.[0] ?? null;
      return value?.value ?? null;
    } catch (e) {
      throw this.createError(e);
    }
  };

  setItem = async (key: string, value: string): Promise<void> => {
    try {
      await this.db.setValues([{ key, value }]);
    } catch (e) {
      throw this.createError(e);
    }
  };

  removeItem = async (key: string): Promise<void> => {
    try {
      await this.db.removeValues([key]);
    } catch (e) {
      throw this.createError(e);
    }
  };

  getMany = async (keys: string[]): Promise<Record<string, string | null>> => {
    try {
      return await this.db.getValues(keys).then((entries) =>
        entries.reduce<Record<string, string | null>>((values, current) => {
          values[current.key] = current.value;
          return values;
        }, {})
      );
    } catch (e) {
      throw this.createError(e);
    }
  };

  setMany = async (entries: Record<string, string>): Promise<void> => {
    try {
      await this.db.setValues(
        Object.entries(entries).map(([key, value]) => ({ key, value }))
      );
    } catch (e) {
      throw this.createError(e);
    }
  };

  removeMany = async (keys: string[]): Promise<void> => {
    try {
      await this.db.removeValues(keys);
    } catch (e) {
      throw this.createError(e);
    }
  };

  getAllKeys = async (): Promise<string[]> => {
    try {
      return await this.db.getKeys();
    } catch (e) {
      throw this.createError(e);
    }
  };

  clear = async (): Promise<void> => {
    try {
      return await this.db.clearStorage();
    } catch (e) {
      throw this.createError(e);
    }
  };

  private createError(e: any): AsyncStorageError {
    if (e instanceof AsyncStorageError) {
      return e;
    }
    return AsyncStorageError.jsError(
      e?.message ?? `Web storage error: ${e}`,
      AsyncStorageError.Type.WebStorageError
    );
  }
}

export function createAsyncStorage(databaseName: string): AsyncStorage {
  return new AsyncStorageWebImpl(databaseName);
}
