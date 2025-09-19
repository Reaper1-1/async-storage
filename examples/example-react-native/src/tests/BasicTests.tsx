import type { AsyncStorage } from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, Button, Pressable, ScrollView, Text, View } from "react-native";

type Props = {
  storage: AsyncStorage;
};

const BasicTests: React.FC<Props> = ({ storage }) => {
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
    Alert.alert(e?.name ?? "Error", JSON.stringify(e, null, 2));
  }

  const testSingleSetCrudKey = async () => {
    try {
      const key = "my-test-key";
      let value = `value-${Math.round(Math.random() * 1000)}`;

      addLog(`setting ${key} with value ${value}`);
      await storage.setItem(key, value);
      addLog(`stored ${key} value:`, await storage.getItem(key));

      let keysToFetch = [key, "missing-key-1", "missing-key-2"];
      addLog(
        `fetching keys (${keysToFetch}): `,
        await storage.getMany(keysToFetch)
      );

      value = `value-${Math.round(Math.random() * 1000)}`;
      addLog(`Overriding ${key} with value ${value}`);
      await storage.setItem(key, value);
      addLog(`current ${key} value:`, await storage.getItem(key));

      addLog(`removing ${key}`);
      await storage.removeItem(key);
      addLog(`current ${key} value:`, await storage.getItem(key));

      keysToFetch = [key, "missing-key-1", "missing-key-2"];
      addLog(
        `fetching keys (${keysToFetch}): `,
        await storage.getMany(keysToFetch)
      );
    } catch (e) {
      reportError(e);
    }
  };

  const testMultiKey = async () => {
    try {
      const entries = { key1: "value1", key2: "42", key3: "true" };
      addLog("MultiSet test with entries:", entries);
      await storage.setMany(entries);
      addLog("fetching keys", ["key1", "key2", "key3", "missing"]);
      const values = await storage.getMany(["key1", "key2", "key3", "missing"]);
      addLog("result", values);

      addLog("removing key1 and key2");
      await storage.removeMany(["key1", "key2"]);
      const remainingKeys = await storage.getAllKeys();
      addLog("remaining keys after removing:", remainingKeys);

      const final = await storage.getMany(remainingKeys);
      addLog("get many remaining keys:", final);
    } catch (e) {
      reportError(e);
    }
  };

  return (
    <View style={{ paddingHorizontal: 16, flex: 1 }}>
      <View style={{ gap: 8 }}>
        <Button
          title="Test CRUD on single entry"
          onPress={testSingleSetCrudKey}
        />
        <Button title="Test CRUD on many entries" onPress={testMultiKey} />
      </View>

      <View style={{ width: "100%", alignItems: "flex-end" }}>
        <Pressable
          onPress={clearLog}
          style={({ pressed }) => [
            {
              padding: 12,
              width: 90,
              backgroundColor: pressed ? "rgb(210, 230, 255)" : "transparent",
            },
          ]}
        >
          <Text>clear logs</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ gap: 12 }}>
        {logs.map((l, i) => (
          <Text style={{ fontSize: 14 }} key={i}>
            {l}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default BasicTests;
