import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  multiply(a: number, b: number): number;
  // multiGet: (
  //   keys: string[],
  //   callback: (error?: ErrorLike[], result?: [string, string][]) => void
  // ) => void;
  // multiSet: (
  //   kvPairs: [string, string][],
  //   callback: (error?: ErrorLike[]) => void
  // ) => void;
  // multiRemove: (
  //   keys: readonly string[],
  //   callback: (error?: ErrorLike[]) => void
  // ) => void;
  // multiMerge: (
  //   kvPairs: [string, string][],
  //   callback: (error?: ErrorLike[]) => void
  // ) => void;
  // getAllKeys: (
  //   callback: (error?: ErrorLike[], result?: [string, string][]) => void
  // ) => void;
  // clear: (callback: (error?: ErrorLike[]) => void) => void;
}

export default TurboModuleRegistry.get<Spec>("RNCAsyncStorage");
