import type { AsyncStorage } from "@react-native-async-storage/async-storage";
import React, { useState } from "react";

type Props = {
  storage: AsyncStorage;
};

const BasicTests: React.FC<Props> = ({ storage }) => {
  const [logs, setLogs] = useState<string[]>([]);

  function addLog(...text: any[]) {
    const message = text
      .map((t) => {
        if (typeof t !== "string") {
          return JSON.stringify(t, null, 2);
        }
        return t;
      })
      .join(" ");

    setLogs((l) => [...l, message]);
  }

  function clearLog() {
    setLogs([]);
  }

  function reportError(e: any) {
    alert(JSON.stringify(e, null, 2));
  }

  const testSingleSetCrudKey = async () => {
    try {
      const key = "single-set";
      let value = `value-${Math.round(Math.random() * 1000)}`;

      addLog(`setting ${key} with value ${value}`);
      await storage.setItem(key, value);
      addLog(`stored ${key} value:`, await storage.getItem(key));

      let keysToFetch = [key, "missing-key-1", "missing-key-2"];
      addLog(
        `fetching keys (${keysToFetch}): `,
        await storage.getMany(keysToFetch)
      );

      addLog(`removing ${key}`);
      await storage.removeItem(key);
      addLog(`current ${key} value:`, await storage.getItem(key));

      value = `value-${Math.round(Math.random() * 1000)}`;
      addLog(`Saving new ${key} value: ${value}`);
      await storage.setItem(key, value);
      addLog(`current ${key} value:`, await storage.getItem(key));

      value = `value-${Math.round(Math.random() * 1000)}`;
      addLog(`Overriding n ${key} value: ${value}`);
      await storage.setItem(key, value);
      addLog(`current ${key} value:`, await storage.getItem(key));

      keysToFetch = [key, "missing-key-1", "missing-key-2"];
      addLog(
        `fetching keys (${keysToFetch}): `,
        await storage.getMany(keysToFetch)
      );
    } catch (e) {
      reportError(e);
    }
  };

  const testMultiKey = async () => {
    try {
      const entries = { key1: "value1", key2: "42", key3: "true" };
      addLog("MultiSet test with entries:", entries);
      await storage.setMany(entries);
      addLog("fetching keys", ["key1", "key2", "key3", "missing"]);
      const values = await storage.getMany(["key1", "key2", "key3", "missing"]);
      addLog("result", values);

      addLog("removing key1 and key2");
      await storage.removeMany(["key1", "key2"]);
      const remainingKeys = await storage.getAllKeys();
      addLog("remaining keys after removing:", remainingKeys);

      const final = await storage.getMany(remainingKeys);
      addLog("get many remaining keys:", final);
    } catch (e) {
      reportError(e);
    }
  };

  return (
    <div className="flex flex-col items-center px-4">
      <div className="flex flex-col max-w-64 items-center gap-2">
        <button
          onClick={testSingleSetCrudKey}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test CRUD on single entry
        </button>

        <button
          onClick={testMultiKey}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test CRUD on many entries
        </button>
      </div>

      <div className="w-full flex justify-end max-w-1/4 mt-2">
        <button
          onClick={clearLog}
          className="w-[90px] px-3 py-2 rounded hover:bg-blue-100"
        >
          clear logs
        </button>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto mt-4">
        {logs.map((l, i) => (
          <p key={i} className="text-sm">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
};

export default BasicTests;
