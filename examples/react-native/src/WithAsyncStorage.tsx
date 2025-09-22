import type { AsyncStorage } from "@react-native-async-storage/async-storage";
import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import type React from "react";
import { useState } from "react";

type Props = {
  dbName: string;
  TestComponent: React.FC<{ storage: AsyncStorage }>;
};

const WithAsyncStorage: React.FC<Props> = ({ TestComponent, dbName }) => {
  const [storage] = useState(() => createAsyncStorage(dbName));

  return <TestComponent storage={storage} />;
};

export default WithAsyncStorage;
