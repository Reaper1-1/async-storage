import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  getValues: (
    db: string,
    keys: string[]
  ) => Promise<{ key: string; value: string | null }[]>;

  setValues: (
    db: string,
    values: { key: string; value: string }[]
  ) => Promise<{ key: string; value: string | null }[]>;

  removeValues: (db: string, keys: string[]) => Promise<void>;

  getKeys: (db: string) => Promise<string[]>;

  clearStorage: (db: string) => Promise<string[]>;
}

export default TurboModuleRegistry.get<Spec>("RNAsyncStorage");
