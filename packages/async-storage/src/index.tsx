import { getLegacyStorage } from "./createAsyncStorage";

export type { AsyncStorage } from "./AsyncStorage";
export { createAsyncStorage } from "./createAsyncStorage";

// Legacy storage that is proxy to an old storage data.
export default getLegacyStorage();
