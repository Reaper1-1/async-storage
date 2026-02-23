# Error handling

All `AsyncStorage` methods throw a specialized error type called `AsyncStorageError`.  
This class extends the standard `Error` class and adds a `type` property to make it easier to identify the specific
issue.

## Error types

Errors are categorized using the `AsyncStorageError.Type` enum, which includes the following values:

### NativeModuleError

Occurs when the React Native native module fails - for example, if the module is null at app startup or not initialized
correctly.

### WebStorageError

Occurs on the Web when an IndexedDB operation fails.
[See IndexedDB error codes](https://developer.mozilla.org/en-US/docs/Web/API/IDBRequest/errori)

### SqliteStorageError

Occurs when SQLite itself fails on iOS, macOS, or Android.
[See SQLite error codes](https://www.sqlite.org/rescode.html)

### OtherStorageError

Used for storage-related failures that don’t fall into the other categories.  
Examples include:

- Storage not initialized correctly

- Corrupt or misformatted data returned from native code

- Legacy storage exceptions (any error thrown by v2 implementation falls here)

### UnknownError

A catch-all for errors that cannot be classified into any of the defined categories.

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
