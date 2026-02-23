import { useEffect, useState } from "react";
import AsyncStorage, {
  createAsyncStorage,
} from "@react-native-async-storage/async-storage";

function getStorage(forName: string | null) {
  return forName ? createAsyncStorage(forName) : AsyncStorage;
}

export function useTestStorage(name: string | null) {
  const [storage, setStorage] = useState(() => getStorage(name));

  useEffect(() => {
    setStorage(getStorage(name));
  }, [name]);

  return storage;
}
