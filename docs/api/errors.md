# Error handling

All `AsyncStorage` methods throw a specialized error type, `AsyncStorageError`.
This class extends the standard `Error` class, by adding a `type` property to help identify the issue.

## Error types

The error type is an enum `AsyncStorageError.Type` with the following possible values:

### NativeModuleError

Raised when the RN native module itself fails — for example,
the module is null at app startup, or not initialized correctly.

### WebStorageError

Web only, when an IndexedDB operation fails.
[See IndexedDB error codes](https://developer.mozilla.org/en-US/docs/Web/API/IDBRequest/error.

### SqliteStorageError

Raised when SQLite itself fails on iOS, macOS, or Android.
[See SQLite error codes](https://www.sqlite.org/rescode.html).

### OtherStorageError

Raised for other storage-related failures that don’t fit into the categories above.
Examples include:

- Storage not initialized correctly

- Corrupt or misformatted data returned from native code

- Legacy storage exceptions (any error thrown by v2 implementation falls here)

### UnknownError

A catch-all for cases where the system cannot classify the error.

## Example of error handling

```typescript
import {
  createAsyncStorage,
  AsyncStorageError,
} from "@react-native-async-storage/async-storage";

const storage = createAsyncStorage("user");

try {
  await storage.setItem("email", "john@example.com");
} catch (e) {
  if (e instanceof AsyncStorageError) {
    switch (e.type) {
      case AsyncStorageError.Type.SqliteStorageError:
        console.error("SQLite failure:", e.message);
        break;
      case AsyncStorageError.Type.WebStorageError:
        console.error("IndexedDB failure:", e.message);
        break;
      default:
        console.error("AsyncStorage error:", e.message);
    }
  } else {
    console.error("Unexpected error:", e);
  }
}
```
