import type { FC } from "react";
import { useState } from "react";
import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import React from "react";

const STORAGE_KEY = "testing";

const BasicCrud: FC = () => {
  const [storedNumber, setStoredNumber] = useState<number | null>(null);
  const [storage] = useState(() => createAsyncStorage("test-web"));

  function reportError(e: unknown) {
    alert(JSON.stringify(e, null, 2));
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
      alert("keys: " + keys.join(", "));
    } catch (e) {
      reportError(e);
    }
  };

  React.useEffect(() => {
    readCurrent();
  }, [storage]);

  return (
    <div>
      <p>Currently stored: </p>
      <p>{storedNumber}</p>
      <button onClick={increaseByTen}> Increase by 10</button>
      <button onClick={removeItem}>remove item</button>
      <button onClick={listAllKeys}>list all keys</button>
    </div>
  );
};

export default BasicCrud;
