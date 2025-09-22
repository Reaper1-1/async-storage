import type { AsyncStorage } from "@react-native-async-storage/async-storage";
import { useTests } from "../useTests";

export function useBasicTest(storage: AsyncStorage) {
  const tests = useTests();

  const testSingleSetCrudKey = async () => {
    try {
      tests.clear();
      tests.info("clearing storage");
      await storage.clear();
      const key = "single-set";
      let value = `value-${Math.round(Math.random() * 1000)}`;
      tests.info(`setting ${key} with value ${value}`);
      await storage.setItem(key, value);
      tests.assert(value, await storage.getItem(key), "retrieves stored value");

      let keysToFetch = [key, "missing-key-1", "missing-key-2"];
      tests.assert(
        { [key]: value, "missing-key-1": null, "missing-key-2": null },
        await storage.getMany(keysToFetch),
        "fetches requested values"
      );

      tests.assert([key], await storage.getAllKeys(), "reads all stored keys");

      tests.info(`removing ${key}`);
      await storage.removeItem(key);
      tests.assert(
        null,
        await storage.getItem(key),
        `removes stored value for ${key}`
      );

      value = `value-${Math.round(Math.random() * 1000)}`;
      tests.info(`Saving new ${key} value: ${value}`);
      await storage.setItem(key, value);
      tests.assert(value, await storage.getItem(key), `saved value ${value}`);

      value = `value-${Math.round(Math.random() * 1000)}`;
      tests.info(`Overriding n ${key} value: ${value}`);
      await storage.setItem(key, value);
      tests.assert(
        value,
        await storage.getItem(key),
        `Overriding n ${key} value: ${value}`
      );

      keysToFetch = [key, "miss1", "miss2"];
      tests.assert(
        { [key]: value, miss1: null, miss2: null },
        await storage.getMany(keysToFetch),
        `final values keys for keys: ${keysToFetch}`
      );
    } catch (e) {
      tests.report(e);
    }
  };

  const testMultiKey = async () => {
    try {
      tests.clear();
      await storage.clear();
      const entries = { key1: "value1", key2: "42", key3: "true" };
      tests.assert(
        undefined,
        await storage.setMany(entries),
        "MultiSet test with entries"
      );

      tests.assert(
        { ...entries, missing: null },
        await storage.getMany(["key1", "key2", "key3", "missing"]),
        "read stored values"
      );

      tests.info("removing key1 and key2");
      await storage.removeMany(["key1", "key2"]);
      const remainingKeys = await storage.getAllKeys();
      tests.assert(["key3"], remainingKeys, "Should be one key left");

      const final = await storage.getMany(remainingKeys);
      tests.assert({ key3: "true" }, final, "value is still there");
    } catch (e) {
      tests.report(e);
    }
  };

  const saveBigData = async () => {
    try {
      tests.clear();
      const key = "big-data";
      const data = JSON.stringify(new Array(500_000).fill("a"));
      tests.info(`Saving ${key} with data size ${data.length}`);
      const timeNow = +Date.now();
      await storage.setItem(key, data);
      tests.info(`saving took ${+Date.now() - timeNow}ms`);

      tests.info(`reading ${key}`);
      const res = await storage.getItem(key);
      tests.assert(res?.length, data.length, "restored data is same size");
    } catch (e) {
      tests.report(e);
    }
  };

  const clearStorage = async () => {
    try {
      tests.clear();
      await storage.clear();
      tests.assert([], await storage.getAllKeys(), "should be empty storage");

      tests.info("saving some values");
      await storage.setItem("i should be here", "my item");
      tests.assert(
        ["i should be here"],
        await storage.getAllKeys(),
        "should return single value"
      );
    } catch (e) {
      tests.report(e);
    }
  };

  return {
    logs: tests.logs,
    clearLogs: tests.clear,
    tests: [
      {
        name: "Single key set",
        run: testSingleSetCrudKey,
      },
      {
        name: "Multiple key sets",
        run: testMultiKey,
      },
      {
        name: "Big data set",
        run: saveBigData,
      },
      {
        name: "Storage clearance",
        run: clearStorage,
      },
    ],
  };
}
