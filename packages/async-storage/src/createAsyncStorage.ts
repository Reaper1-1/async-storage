import type { AsyncStorage } from "./AsyncStorage";
import { AsyncStorageError } from "./AsyncStorageError";

class AsyncStorageWebImpl implements AsyncStorage {
  constructor(private readonly dbName: string) {}

  getItem = async (key: string): Promise<string | null> => {
    try {
      // todo:
      return null;
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  setItem = async (key: string, value: string): Promise<void> => {
    try {
      // todo
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  removeItem = async (key: string): Promise<void> => {
    try {
      // todo
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  getMany = async (keys: string[]): Promise<Record<string, string | null>> => {
    try {
      // todo
      return {};
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  setMany = async (entries: Record<string, string>): Promise<void> => {
    try {
      // todo
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  removeMany = async (keys: string[]): Promise<void> => {
    try {
      // todo
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  getAllKeys = async (): Promise<string[]> => {
    try {
      // todo
      return [];
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };

  clear = async (): Promise<void> => {
    try {
      // return await this.db.clearStorage(this.dbName);
      // todo
    } catch (e) {
      throw AsyncStorageError.nativeError(e);
    }
  };
}

export function createAsyncStorage(databaseName: string): AsyncStorage {
  return new AsyncStorageWebImpl(databaseName);
}
