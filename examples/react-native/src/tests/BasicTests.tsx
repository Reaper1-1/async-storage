import type { AsyncStorage } from "@react-native-async-storage/async-storage";
import React from "react";
import { Button, Pressable, ScrollView, Text, View } from "react-native";
import { useBasicTest } from "example-common-tests";

type Props = {
  storage: AsyncStorage;
};

const BasicTests: React.FC<Props> = ({ storage }) => {
  const { tests, logs, clearLogs } = useBasicTest(storage);

  return (
    <View style={{ paddingHorizontal: 16, flex: 1 }}>
      <View style={{ gap: 8, flexDirection: "row", flexWrap: "wrap" }}>
        {tests.map((test) => {
          return (
            <Button key={test.name} title={test.name} onPress={test.run} />
          );
        })}
      </View>

      <View style={{ width: "100%", flex: 1 }}>
        <View style={{ width: "100%", alignItems: "flex-end" }}>
          <Pressable
            onPress={clearLogs}
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
            <Text
              style={{
                fontSize: 14,
                color:
                  l.type === "ok" ? "green" : l.type === "err" ? "red" : "",
              }}
              key={i}
            >
              {l.message}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default BasicTests;
