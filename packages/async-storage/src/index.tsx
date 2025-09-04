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

  setItem = async (key: string, value: string): Promise<void> => {
    await this.db.setValues(this.dbName, [{ key, value }]);
  };

  removeItem = async (key: string): Promise<void> =>
    this.db.removeValues(this.dbName, [key]);

  getMany = async (keys: string[]): Promise<Record<string, string | null>> =>
    this.db.getValues(this.dbName, keys).then((entries) =>
      entries.reduce<Record<string, string | null>>((values, current) => {
        values[current.key] = current.value;
        return values;
      }, {})
    );

  setMany = async (entries: Record<string, string>): Promise<void> => {
    await this.db.setValues(
      this.dbName,
      Object.entries(entries).map(([key, value]) => ({ key, value }))
    );
  };

  removeMany = async (keys: string[]): Promise<void> =>
    this.db.removeValues(this.dbName, keys);

  getKeys = (): Promise<string[]> => this.db.getKeys(this.dbName);

  clear = (): Promise<void> => this.db.clearStorage(this.dbName);
}

export default AsyncStorage;
