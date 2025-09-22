import React, { useState } from "react";
import { Pressable, StatusBar, Text, useColorScheme, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BasicTests from "./tests/BasicTests";
import WithLegacyStorage from "./WithLegacyStorage";
import WithAsyncStorage from "./WithAsyncStorage";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const [example, setExample] = useState<"basic" | "legacy-basic">("basic");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            padding: 8,
            gap: 4,
          }}
        >
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
        </View>

        {(() => {
          switch (example) {
            case "basic":
              return (
                <WithAsyncStorage dbName="test-db" TestComponent={BasicTests} />
              );
            case "legacy-basic":
              return <WithLegacyStorage TestComponent={BasicTests} />;
          }
        })()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const activeTab = "#F42C04";
const inactiveTab = "#625F63AA";
const Tab: React.FC<{
  active: boolean;
  title: string;
  onPress: () => void;
}> = ({ active, onPress, title }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 8,
        backgroundColor: active ? activeTab : inactiveTab,
      }}
    >
      <Text
        style={{
          color: "white",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default App;
