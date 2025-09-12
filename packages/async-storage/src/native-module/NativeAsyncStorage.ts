import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  getValues: (
    dbName: string,
    keys: string[]
  ) => Promise<{ key: string; value: string | null }[]>;

  setValues: (
    dbName: string,
    values: { key: string; value: string | null }[]
  ) => Promise<{ key: string; value: string | null }[]>;

  removeValues: (dbName: string, keys: string[]) => Promise<void>;

  getKeys: (dbName: string) => Promise<string[]>;

  clearStorage: (dbName: string) => Promise<void>;
}

export default TurboModuleRegistry.get<Spec>("RNAsyncStorage");
