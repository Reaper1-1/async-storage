import type { AsyncStorage } from "./AsyncStorage";
import { AsyncStorageError } from "./AsyncStorageError";
import { TurboModuleRegistry, type TurboModule } from "react-native";

/**
 * Because of missing support for Windows native target by Room KMP,
 * Windows target uses v2 implementation of AsyncStorage.
 */
export function createAsyncStorage(_: string): AsyncStorage {
  return getLegacyStorage();
}

export function getLegacyStorage(): AsyncStorage {
  return LegacyAsyncStorageImpl.instance;
}

class LegacyAsyncStorageImpl implements AsyncStorage {
  private constructor() {}

  static instance = new LegacyAsyncStorageImpl();

  private get db(): NativeAsyncStorageSpec {
    const mod = RNCAsyncStorage;
    if (!mod) {
      throw AsyncStorageError.jsError(
        `Native module is null, cannot access storage.`,
        AsyncStorageError.Type.NativeModuleError
      );
    }
    return mod;
  }

  getItem = async (key: string): Promise<string | null> => {
    try {
      return await new Promise<string | null>((resolve, reject) => {
        this.db.multiGet([key], (errors, result) => {
          const error = this.getError(errors);
          if (error) {
            return reject(
              AsyncStorageError.jsError(
                error.message,
                AsyncStorageError.Type.OtherStorageError
              )
            );
          }
          resolve(result?.[0]?.[1] ?? null);
        });
      });
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  setItem = async (key: string, value: string): Promise<void> => {
    try {
      await new Promise<void>((resolve, reject) => {
        this.db.multiSet([[key, value]], (errors) => {
          const error = this.getError(errors);
          if (error) {
            return reject(
              AsyncStorageError.jsError(
                error.message,
                AsyncStorageError.Type.OtherStorageError
              )
            );
          }
          resolve();
        });
      });
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  removeItem = async (key: string): Promise<void> => {
    try {
      await new Promise<void>((resolve, reject) => {
        this.db.multiRemove([key], (errors) => {
          const error = this.getError(errors);
          if (error) {
            return reject(
              AsyncStorageError.jsError(
                error.message,
                AsyncStorageError.Type.OtherStorageError
              )
            );
          }
          resolve();
        });
      });
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  getMany = async (keys: string[]): Promise<Record<string, string | null>> => {
    try {
      return await new Promise((resolve, reject) => {
        this.db.multiGet(keys, (errors, result) => {
          const error = this.getError(errors);
          if (error) {
            return reject(
              AsyncStorageError.jsError(
                error.message,
                AsyncStorageError.Type.OtherStorageError
              )
            );
          }
          const resultMap = new Map(result);
          const entries: Record<string, string | null> = {};
          for (const key of keys) {
            entries[key] = resultMap.get(key) ?? null;
          }
          resolve(entries);
        });
      });
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  setMany = async (entries: Record<string, string>): Promise<void> => {
    try {
      await new Promise<void>((resolve, reject) => {
        this.db.multiSet(Object.entries(entries), (errors) => {
          const error = this.getError(errors);
          if (error) {
            return reject(
              AsyncStorageError.jsError(
                error.message,
                AsyncStorageError.Type.OtherStorageError
              )
            );
          }
          resolve();
        });
      });
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  removeMany = async (keys: string[]): Promise<void> => {
    try {
      await new Promise<void>((resolve, reject) => {
        this.db.multiRemove(keys, (errors) => {
          const error = this.getError(errors);
          if (error) {
            return reject(
              AsyncStorageError.jsError(
                error.message,
                AsyncStorageError.Type.OtherStorageError
              )
            );
          }
          resolve();
        });
      });
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  getAllKeys = async (): Promise<string[]> => {
    try {
      return await new Promise((resolve, reject) => {
        this.db.getAllKeys((errors, result) => {
          const error = this.getError(errors);
          if (error) {
            return reject(
              AsyncStorageError.jsError(
                error.message,
                AsyncStorageError.Type.OtherStorageError
              )
            );
          }
          if (!result) {
            return reject(
              AsyncStorageError.jsError(
                "Invalid state, no error and no values returned",
                AsyncStorageError.Type.UnknownError
              )
            );
          }

          resolve(result);
        });
      });
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  clear = async (): Promise<void> => {
    try {
      await new Promise<void>((resolve, reject) => {
        this.db.clear((errors) => {
          const error = this.getError(errors);
          if (error) {
            return reject(
              AsyncStorageError.jsError(
                error.message,
                AsyncStorageError.Type.OtherStorageError
              )
            );
          }
          resolve();
        });
      });
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  private getError = (potentialError: any): ErrorLike | null => {
    if (!potentialError) {
      return null;
    }

    if (Array.isArray(potentialError) && potentialError.length) {
      const firstError = potentialError.find((e): e is ErrorLike => e?.message);
      if (firstError) {
        return firstError;
      }
      return null;
    } else if (potentialError?.message) {
      return potentialError;
    }
    return null;
  };
}

/**
 *
 * This is a backward compatibility layer, to support Windows target in v3.
 * Room KMP does not support Windows native target currently, so shared-storage cannot be used.
 * https://issuetracker.google.com/issues/363195546
 */
const RNCAsyncStorage =
  TurboModuleRegistry.get<NativeAsyncStorageSpec>("RNCAsyncStorage");

type ErrorLike = {
  message: string;
  key?: string;
};

interface NativeAsyncStorageSpec extends TurboModule {
  multiGet: (
    keys: string[],
    callback: (error?: ErrorLike[], result?: [string, string][]) => void
  ) => void;
  multiSet: (
    kvPairs: [string, string][],
    callback: (error?: ErrorLike[]) => void
  ) => void;
  multiRemove: (
    keys: readonly string[],
    callback: (error?: ErrorLike[]) => void
  ) => void;
  multiMerge: (
    kvPairs: [string, string][],
    callback: (error?: ErrorLike[]) => void
  ) => void;
  getAllKeys: (
    callback: (error?: ErrorLike[], result?: string[]) => void
  ) => void;
  clear: (callback: (error?: ErrorLike[]) => void) => void;
}
