import type { AsyncStorage } from "@react-native-async-storage/async-storage";
import { useLogs, type TestLogs } from "../useLogs";
import type { RunTest } from "../types";

export function useBasicTest(storage: AsyncStorage): {
  logs: TestLogs;
  tests: RunTest[];
} {
  const logs = useLogs();

  const testSingleSetCrudKey = async () => {
    try {
      logs.clear();
      const key = "single-set";
      let value = `value-${Math.round(Math.random() * 1000)}`;

      logs.add(`setting ${key} with value ${value}`);
      await storage.setItem(key, value);
      logs.add(`stored ${key} value:`, await storage.getItem(key));

      let keysToFetch = [key, "missing-key-1", "missing-key-2"];
      logs.add(
        `fetching keys (${keysToFetch}): `,
        await storage.getMany(keysToFetch)
      );

      logs.add(`all keys: `, await storage.getAllKeys());

      logs.add(`removing ${key}`);
      await storage.removeItem(key);
      logs.add(`current ${key} value:`, await storage.getItem(key));

      value = `value-${Math.round(Math.random() * 1000)}`;
      logs.add(`Saving new ${key} value: ${value}`);
      await storage.setItem(key, value);
      logs.add(`current ${key} value:`, await storage.getItem(key));

      value = `value-${Math.round(Math.random() * 1000)}`;
      logs.add(`Overriding n ${key} value: ${value}`);
      await storage.setItem(key, value);
      logs.add(`current ${key} value:`, await storage.getItem(key));

      keysToFetch = [key, "missing-key-1", "missing-key-2"];
      logs.add(
        `fetching keys (${keysToFetch}): `,
        await storage.getMany(keysToFetch)
      );
    } catch (e) {
      logs.report(e);
    }
  };

  const testMultiKey = async () => {
    try {
      logs.clear();
      const entries = { key1: "value1", key2: "42", key3: "true" };
      logs.add("MultiSet test with entries:", entries);
      await storage.setMany(entries);
      logs.add("fetching keys", ["key1", "key2", "key3", "missing"]);
      const values = await storage.getMany(["key1", "key2", "key3", "missing"]);
      logs.add("result", values);

      logs.add("removing key1 and key2");
      await storage.removeMany(["key1", "key2"]);
      const remainingKeys = await storage.getAllKeys();
      logs.add("remaining keys after removing:", remainingKeys);

      const final = await storage.getMany(remainingKeys);
      logs.add("get many remaining values:", final);
    } catch (e) {
      logs.report(e);
    }
  };

  const saveBigData = async () => {
    try {
      logs.clear();
      const key = "big-data";
      const data = JSON.stringify(new Array(500_000).fill("a"));
      logs.add(`Saving ${key} with data size ${data.length}`);
      const timeNow = +Date.now();
      await storage.setItem(key, data);
      logs.add(`saving took ${+Date.now() - timeNow}ms`);

      logs.add(`reading ${key}`);
      const res = await storage.getItem(key);
      logs.add(`size of result: ${res?.length}`);
    } catch (e) {
      logs.report(e);
    }
  };

  const clearStorage = async () => {
    try {
      logs.clear();
      logs.add("Currently stored keys: ", await storage.getAllKeys());

      logs.add("deleting everything");
      storage.clear();
      logs.add("keys after deletion: ", await storage.getAllKeys());
      logs.add("saving some values");

      await storage.setItem("key-after-delete", "my item");
      logs.add("keys after saving: ", await storage.getAllKeys());
    } catch (e) {
      logs.report(e);
    }
  };

  return {
    logs,
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
