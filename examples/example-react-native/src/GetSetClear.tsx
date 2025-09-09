/* eslint-disable */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

function GetSet() {
  const [storedNumber, setStoredNumber] = React.useState("");
  const [needsRestart, setNeedsRestart] = React.useState(false);
  const [storage] = useState(() => new AsyncStorage(StorageDb));

  React.useEffect(() => {
    storage
      .getItem(STORAGE_KEY)
      .then((value) => {
        if (value) {
          setStoredNumber(value || "");
        }
      })
      .catch(console.error);
  }, [storage]);

  const increaseByTen = async () => {
    const newNumber = +storedNumber > 0 ? +storedNumber + 10 : 10;

    await storage.setItem(STORAGE_KEY, `${newNumber}`).catch(console.error);

    setStoredNumber(`${newNumber}`);
    setNeedsRestart(true);
  };

  const removeItem = async () => {
    await storage.removeItem(STORAGE_KEY).catch(console.error);
    setNeedsRestart(true);
  };

  return (
    <View>
      <Text style={styles.text}>Currently stored: </Text>
      <Text style={styles.text}>{storedNumber}</Text>
      <Button title="Increase by 10" onPress={increaseByTen} />
      <Button title="remove item" onPress={removeItem} />
      {needsRestart ? <Text>Hit restart to see effect</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#000000",
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

export const STORAGE_KEY = "random";
const StorageDb = "test";

export default GetSet;
