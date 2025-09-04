import type { PersistentAsyncStorage } from "./storage/PersistentAsyncStorage";
import NativeAsyncStorage, {
  type Spec as NativeAsyncStorageSpec,
} from "./native-module/NativeAsyncStorage";

class AsyncStorage implements PersistentAsyncStorage {
  constructor(private readonly dbName: string) {}

  private get db(): NativeAsyncStorageSpec {
    const mod = NativeAsyncStorage;
    if (!mod) {
      throw new Error(`Native module is null, cannot create db`);
    }
    return mod;
  }

  getItem = async (key: string): Promise<string | null> => {
    const result = await this.db.getValues(this.dbName, [key]);
    const value = result[0] ?? null;
    return value?.value ?? null;
  };

  setItem(key: string, value: string): Promise<void> {
    return Promise.reject(`todo setItem ${key} ${value}`);
  }

  removeItem(key: string): Promise<void> {
    return Promise.reject(`todo removeItem ${key}`);
  }

  getMany(keys: string[]): Promise<Record<string, string | null>> {
    return Promise.reject(`todo getMany ${keys}`);
  }

  setMany(entries: Record<string, string>): Promise<void> {
    return Promise.reject(`todo setMany ${entries}`);
  }

  removeMany(keys: string[]): Promise<void> {
    return Promise.reject(`todo removeMany ${keys}`);
  }

  getKeys(): Promise<string[]> {
    console.log('lets goo')
    return this.db.getKeys(this.dbName);
  }

  clear(): Promise<void> {
    return Promise.reject("todo clear");
  }
}

export default AsyncStorage;
