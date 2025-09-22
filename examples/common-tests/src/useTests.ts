import { useState } from "react";
import isEqual from "lodash.isequal";

type Log = { type: "info" | "ok" | "err"; message: string };

type TestValue =
  | string
  | number
  | string[]
  | Record<string, string | null>
  | null
  | undefined
  | void;

export function useTests() {
  const [logs, setLogs] = useState<Log[]>([]);

  function addLog(message: string) {
    setLogs((l) => [...l, { type: "info", message }]);
  }

  function addErr(message: string) {
    setLogs((l) => [...l, { type: "err", message }]);
  }

  function addOk(message: string) {
    setLogs((l) => [...l, { type: "ok", message }]);
  }

  function clearLog() {
    setLogs([]);
  }

  function reportError(e: any) {
    alert(JSON.stringify(e, null, 2));
  }

  function assertEqual(
    expected: TestValue,
    actual: TestValue,
    testName: string
  ) {
    if (!isEqual(expected, actual)) {
      addErr(
        `${testName} failed: | Expected: ${JSON.stringify(expected)} | Actual: ${JSON.stringify(actual)}`
      );
    } else {
      addOk(`${testName} | Actual: ${JSON.stringify(actual)}`);
    }
  }

  return {
    logs,
    info: addLog,
    error: addErr,
    ok: addOk,
    assert: assertEqual,
    clear: clearLog,
    report: reportError,
  };
}
