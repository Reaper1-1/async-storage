import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import BasicTest from "./tests/BasicTests";
import WithAsyncStorage from "./WithAsyncStorage";
import WithLegacyStorage from "./WithLegacyStorage";

function App() {
  const [example, setExample] = useState<"basic" | "legacy-basic">("basic");

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <div className="flex flex-row justify-center gap-1 p-2 mb-12">
        <Tab
          title="Basic"
          active={example === "basic"}
          onPress={() => setExample("basic")}
        />

        <Tab
          title="Basic (Legacy)"
          active={example === "legacy-basic"}
          onPress={() => setExample("legacy-basic")}
        />
      </div>

      <div className="flex-1">
        {(() => {
          switch (example) {
            case "basic":
              return (
                <WithAsyncStorage dbName="test-db" TestComponent={BasicTest} />
              );
            case "legacy-basic":
              return <WithLegacyStorage TestComponent={BasicTest} />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}

const Tab: React.FC<{
  active: boolean;
  title: string;
  onPress: () => void;
}> = ({ active, title, onPress }) => {
  return (
    <button
      onClick={onPress}
      className={`px-3 py-2 text-white rounded ${active ? "bg-[#F42C04]" : "bg-[#625F63AA]"}`}
    >
      {title}
    </button>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
