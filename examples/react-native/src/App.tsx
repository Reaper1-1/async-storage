import React, { useState } from "react";
import { StatusBar, useColorScheme, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TabButton } from "./components/TabButton";
import BasicTests from "./tests/BasicTests";
import PerformanceTests from "./tests/PerformanceTest";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const [example, setExample] = useState<
    "basic" | "legacy-basic" | "perf" | "legacy-perf"
  >("basic");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: 8,
            gap: 2,
          }}
        >
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
        </View>

        {(() => {
          switch (example) {
            case "basic":
              return <BasicTests key={example} storageName="test-db-storage" />;
            case "legacy-basic":
              return <BasicTests key={example} storageName={null} />;
            case "perf":
              return (
                <PerformanceTests key={example} storageName="test-db-storage" />
              );
            case "legacy-perf":
              return <PerformanceTests key={example} storageName={null} />;
          }
        })()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
