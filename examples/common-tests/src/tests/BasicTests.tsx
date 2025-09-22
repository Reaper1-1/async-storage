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

  const testSavingBigData = async () => {
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

  const testClearingStorage = async () => {
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

  const testRemoveNonExistentKeys = async () => {
    try {
      tests.clear();
      await storage.clear();

      const missingKeys = ["missing1", "missing2"];
      tests.info(`Attempting to remove non-existent keys: ${missingKeys}`);
      await storage.removeMany(missingKeys);
      tests.assert(
        [],
        await storage.getAllKeys(),
        "Removing missing keys is safe"
      );
    } catch (e) {
      tests.report(e);
    }
  };

  const testConcurrentSetAndGet = async () => {
    try {
      tests.clear();
      await storage.clear();

      const key1 = "concurrent1";
      const key2 = "concurrent2";
      const key3 = "concurrent3";
      const key4 = "concurrent4";
      const key5 = "concurrent5";

      tests.info("Setting multiple keys concurrently");
      await Promise.all([
        storage.setItem(key1, key1),
        storage.setItem(key2, key2),
        storage.setItem(key3, key3),
        storage.setItem(key4, key4),
        storage.setItem(key5, key5),
      ]);

      const values = await storage.getMany([key1, key2, key3, key4, key5]);
      tests.assert(
        {
          [key1]: key1,
          [key2]: key2,
          [key3]: key3,
          [key4]: key4,
          [key5]: key5,
        },
        values,
        "Concurrent set/get works"
      );
    } catch (e) {
      tests.report(e);
    }
  };

  const testLargeNumberOfKeys = async () => {
    try {
      tests.clear();
      await storage.clear();

      const entries: Record<string, string> = {};
      for (let i = 0; i < 1000; i++) {
        entries[`key-${i}`] = `value-${i}`;
      }

      tests.info("Saving 1000 keys at once");
      await storage.setMany(entries);

      const keys = await storage.getAllKeys();
      tests.assert(
        Object.keys(entries).sort(),
        keys.sort(),
        "All keys are stored"
      );

      const fetched = await storage.getMany(Object.keys(entries));
      tests.assert(entries, fetched, "All values match");
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
        run: testSavingBigData,
      },
      {
        name: "Storage clearance",
        run: testClearingStorage,
      },
      {
        name: "Safe removal",
        run: testRemoveNonExistentKeys,
      },
      {
        name: "Concurrent set and get",
        run: testConcurrentSetAndGet,
      },
      {
        name: "Test large number of keys",
        run: testLargeNumberOfKeys,
      },
    ],
  };
}
