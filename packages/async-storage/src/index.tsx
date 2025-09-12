import { createAsyncStorage } from "./createAsyncStorage";

export type { AsyncStorage } from "./AsyncStorage";
export { createAsyncStorage } from "./createAsyncStorage";

// exported as default for quick usage
export default createAsyncStorage("default-async-storage");
