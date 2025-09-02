import AsyncStorage from "./NativeAsyncStorage";

export function multiply(a: number, b: number): number {
  return AsyncStorage.multiply(a, b);
}
