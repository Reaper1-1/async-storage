import { useState } from "react";

export type TestLogs = ReturnType<typeof useLogs>;

export function useLogs() {
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

  return {
    logs,
    add: addLog,
    clear: clearLog,
    report: reportError,
  };
}
