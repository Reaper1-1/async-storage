import type { AsyncStorage } from "./AsyncStorage";
import NativeAsyncStorage, {
  type Spec as NativeAsyncStorageSpec,
} from "./native-module/NativeAsyncStorage";
import { AsyncStorageError } from "./AsyncStorageError";

export function createAsyncStorage(databaseName: string): AsyncStorage {
  return new AsyncStorageImpl(databaseName);
}

class AsyncStorageImpl implements AsyncStorage {
  constructor(private readonly dbName: string) {}

  private get db(): NativeAsyncStorageSpec {
    const mod = NativeAsyncStorage;
    if (!mod) {
      throw AsyncStorageError.jsError(
        `Native module is null, cannot create db`,
        AsyncStorageError.Type.NativeModuleError
      );
    }
    return mod;
  }

  getItem = async (key: string): Promise<string | null> => {
    try {
      const result = await this.db.getValues(this.dbName, [key]);
      const value = result?.[0] ?? null;
      return value?.value ?? null;
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  setItem = async (key: string, value: string): Promise<void> => {
    try {
      await this.db.setValues(this.dbName, [{ key, value }]);
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  removeItem = async (key: string): Promise<void> => {
    try {
      await this.db.removeValues(this.dbName, [key]);
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  getMany = async (keys: string[]): Promise<Record<string, string | null>> => {
    try {
      return await this.db.getValues(this.dbName, keys).then((entries) =>
        entries.reduce<Record<string, string | null>>((values, current) => {
          values[current.key] = current.value;
          return values;
        }, {})
      );
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  setMany = async (entries: Record<string, string>): Promise<void> => {
    try {
      await this.db.setValues(
        this.dbName,
        Object.entries(entries).map(([key, value]) => ({ key, value }))
      );
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  removeMany = async (keys: string[]): Promise<void> => {
    try {
      await this.db.removeValues(this.dbName, keys);
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  getAllKeys = async (): Promise<string[]> => {
    try {
      return await this.db.getKeys(this.dbName);
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  clear = async (): Promise<void> => {
    try {
      return await this.db.clearStorage(this.dbName);
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };
}

/**
 * This is a proxy to old storage implementation, to help with migration to v3.
 * Usage is highly discouraged and should be used only as a measure to transition v3.
 */
export function getLegacyStorage(): AsyncStorage {
  return LegacyAsyncStorageImpl.instance;
}

class LegacyAsyncStorageImpl implements AsyncStorage {
  private constructor() {}

  static instance = new LegacyAsyncStorageImpl();

  private get db(): NativeAsyncStorageSpec {
    const mod = NativeAsyncStorage;
    if (!mod) {
      throw AsyncStorageError.jsError(
        `Native module is null, access legacy storage`,
        AsyncStorageError.Type.NativeModuleError
      );
    }
    return mod;
  }

  getItem = async (key: string): Promise<string | null> => {
    try {
      const result = await this.db.legacy_multiGet([key]);
      const entry = result?.[0] ?? null;
      return entry?.[1] ?? null;
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  setItem = async (key: string, value: string): Promise<void> => {
    try {
      await this.db.legacy_multiSet([[key, value]]);
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  removeItem = async (key: string): Promise<void> => {
    try {
      await this.db.legacy_multiRemove([key]);
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  getMany = async (keys: string[]): Promise<Record<string, string | null>> => {
    try {
      return await this.db.legacy_multiGet(keys).then((entries) =>
        entries.reduce<Record<string, string | null>>((values, current) => {
          values[current[0]] = current[1] ?? null;
          return values;
        }, {})
      );
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  setMany = async (entries: Record<string, string>): Promise<void> => {
    try {
      await this.db.legacy_multiSet(Object.entries(entries));
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  removeMany = async (keys: string[]): Promise<void> => {
    try {
      await this.db.legacy_multiRemove(keys);
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  getAllKeys = async (): Promise<string[]> => {
    try {
      return await this.db.legacy_getAllKeys();
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  clear = async (): Promise<void> => {
    try {
      return await this.db.legacy_clear();
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };
}
