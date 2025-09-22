import type { AsyncStorage } from "@react-native-async-storage/async-storage";
import LegacyAsyncStorage from "@react-native-async-storage/async-storage";
import type React from "react";

type Props = {
  TestComponent: React.FC<{ storage: AsyncStorage }>;
};

const WithLegacyStorage: React.FC<Props> = ({ TestComponent }) => {
  return <TestComponent storage={LegacyAsyncStorage} />;
};

export default WithLegacyStorage;
