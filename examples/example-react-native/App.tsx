/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { StatusBar, useColorScheme, View } from "react-native";
import GetSetClear from "./src/GetSetClear";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <GetSetClear />
    </View>
  );
}

export default App;
