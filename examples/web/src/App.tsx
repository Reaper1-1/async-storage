import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { TabButton } from "./components/TabButton";
import BasicTest from "./tests/BasicTests";
import PerformanceTest from "./tests/PerformanceTests";

function App() {
  const [example, setExample] = useState<
    "basic" | "legacy-basic" | "perf" | "legacy-perf"
  >("basic");

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <div className="flex flex-row justify-center gap-1 p-2 mb-12">
        <TabButton
          title="Basic"
          active={example === "basic"}
          onPress={() => setExample("basic")}
        />
        <TabButton
          title="Basic (Legacy)"
          active={example === "legacy-basic"}
          onPress={() => setExample("legacy-basic")}
        />
        <TabButton
          title="Performance"
          active={example === "perf"}
          onPress={() => setExample("perf")}
        />
        <TabButton
          title="Performance (Legacy)"
          active={example === "legacy-perf"}
          onPress={() => setExample("legacy-perf")}
        />
      </div>

      <div className="flex-1">
        {(() => {
          switch (example) {
            case "basic":
              return <BasicTest storageName="test-basic-db" />;
            case "legacy-basic":
              return <BasicTest storageName={null} />;
            case "perf":
              return <PerformanceTest storageName="test-perf-db" />;
            case "legacy-perf":
              return <PerformanceTest storageName={null} />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
