import type { AsyncStorage } from "@react-native-async-storage/async-storage";
import { useBasicTest } from "example-common-tests";
import React from "react";

type Props = {
  storage: AsyncStorage;
};

const BasicTests: React.FC<Props> = ({ storage }) => {
  const { tests, clearLogs, logs } = useBasicTest(storage);

  return (
    <div className="flex flex-col items-center px-4">
      <div className="flex flex-col max-w-64 items-center gap-2">
        {tests.map((test) => {
          return (
            <button
              key={test.name}
              onClick={test.run}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {test.name}
            </button>
          );
        })}
      </div>

      <div className="w-full flex justify-end max-w-1/4 mt-2">
        <button
          onClick={clearLogs}
          className="w-[90px] px-3 py-2 rounded hover:bg-blue-100"
        >
          clear logs
        </button>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto mt-4">
        {logs.map((l, i) => (
          <p
            key={i}
            className={`text-sm ${l.type === "ok" ? "text-green-500" : ""} ${l.type === "err" ? "text-red-500" : ""}`}
          >
            {l.message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default BasicTests;
