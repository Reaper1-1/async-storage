import { type TestRunner } from "example-common-tests";
import React from "react";

type Props = {
  runner: TestRunner;
};

const TestRunnerView: React.FC<Props> = ({ runner }) => {
  const { tests, clearLogs, logs } = runner;

  return (
    <div className="flex flex-col items-center px-4">
      <div className="flex flex-row flex-wrap gap-2">
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
        {logs.map((log, i) => (
          <div className="flex flex-col" key={i}>
            {log.messages.map((message) => (
              <span
                className={`text-sm ${log.type === "ok" ? "text-green-500" : ""} ${log.type === "err" ? "text-red-500" : ""}`}
                key={message}
              >
                {message}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestRunnerView;
