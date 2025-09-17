import type { AsyncStorage } from "./AsyncStorage";
import NativeAsyncStorage, {
  type Spec as NativeAsyncStorageSpec,
} from "./native-module/NativeAsyncStorage";
import { AsyncStorageError } from "./AsyncStorageError";

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

export function createAsyncStorage(databaseName: string): AsyncStorage {
  return new AsyncStorageImpl(databaseName);
}
