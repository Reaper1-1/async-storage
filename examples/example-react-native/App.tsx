/* eslint-disable no-console */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from "react";
import { Button, StatusBar, Text, useColorScheme, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const [db] = useState(() => new AsyncStorage("default_db"));

  async function readKeys() {
    console.info("reading all keys");
    const result = db.getKeys().catch((e) =>
      console.info({
        code: e.code,
        message: e.message,
      })
    );
    console.info("keys", result);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View>
        <Text>Hello world</Text>
        <Button title="read keys" onPress={readKeys} />
      </View>
    </View>
  );
}

export default App;
