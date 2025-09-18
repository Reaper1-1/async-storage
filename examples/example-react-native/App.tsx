import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from "react-native";
import BasicCrud from "./src/BasicCrud";
import LegacyBasicCrud from "./src/LegacyBasicCrud";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const [example, setExample] = useState<"basic" | "legacy-basic">("basic");

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 60 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

        <View
          style={{
            maxHeight: 60,
            alignItems: "center",
            flexDirection: "row",
            gap: 4,
          }}
        >
          <Button
            disabled={example === "basic"}
            title="Basic"
            onPress={() => setExample("basic")}
          />
          <Button
            disabled={example === "legacy-basic"}
            title="LegacyBasic"
            onPress={() => setExample("legacy-basic")}
          />
        </View>

        <View style={{ flex: 1 }}>
          {(() => {
            switch (example) {
              case "basic":
                return <BasicCrud />;
              case "legacy-basic":
                return <LegacyBasicCrud />;
            }
          })()}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
