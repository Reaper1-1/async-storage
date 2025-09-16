/* eslint-disable */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export const STORAGE_KEY = "random";

const BasicCrud: React.FC = () => {
  const [storedNumber, setStoredNumber] = React.useState<number | null>(null);
  const [storage] = useState(() => createAsyncStorage("test-database"));

  function reportError(e: any) {
    Alert.alert(e?.name ?? "Error", JSON.stringify(e, null, 2));
  }

  async function readCurrent() {
    try {
      const value = await storage.getItem(STORAGE_KEY);
      setStoredNumber(value ? Number(value) : null);
    } catch (e: any) {
      reportError(e);
    }
  }

  const increaseByTen = async () => {
    const newNumber = (storedNumber ?? 0) + 10;

    try {
      await storage.setItem(STORAGE_KEY, `${newNumber}`);
      setStoredNumber(newNumber);
      await readCurrent();
    } catch (e) {
      reportError(e);
    }
  };

  const removeItem = async () => {
    await storage.removeItem(STORAGE_KEY).catch(reportError);
    await readCurrent();
  };

  const listAllKeys = async () => {
    try {
      const keys = await storage.getAllKeys();
      Alert.alert("keys", keys.join(", "));
    } catch (e) {
      reportError(e);
    }
  };

  React.useEffect(() => {
    readCurrent();
  }, [storage]);

  return (
    <View>
      <Text style={styles.text}>Currently stored: </Text>
      <Text style={styles.text}>{storedNumber}</Text>
      <Button title="Increase by 10" onPress={increaseByTen} />
      <Button title="remove item" onPress={removeItem} />
      <Button title="list all keys" onPress={listAllKeys} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#000000",
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

export default BasicCrud;
