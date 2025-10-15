# Migration to v3

AsyncStorage v3 introduces some breaking changes to simplify the API and make it more consistent.

## Key changes:

### Installation changes

Android requires local maven repo to be added in your `build.gradle(.kts)` file. Head over to [Installation step for Android](index.md#android) to learn more.


### `AsyncStorage` is now instance-based

In v3, AsyncStorage is no longer a singleton.  
Each instance represents an **isolated storage area**, providing separation between data sets. Head over to [Usage page](api/usage.md#creating-a-storage) to learn more.

```typescript
// create seperate storages
const userStorage = createAsyncStorage('user');
const cacheStorage = createAsyncStorage('cache');
```

### Default export still points to v2 storage

To make upgrading smoother, the default export continues to reference the v2 implementation.
This ensures that:

- Your app continues to access previously stored data.
- You can migrate incrementally to v3 instances.

```typescript
// Still works (uses v2 backend)
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.setItem('foo', 'bar');
```

### Callbacks removed — Promises only

All methods are now Promise-based.
The old callback arguments have been removed to make the API simpler and more consistent.

### Removed merge functionality

AsyncStorage's "merge" behavior has historically been inconsistent across platforms. Rather than enforcing a platform-specific merging strategy, the merge API has been removed to avoid ambiguity.

### Errors are more predictable now

All errors now thrown from `AsyncStorage` are instances of `AsyncStorageError` containing `type` of the error it represents. Head over to [Errors page](api/errors.md) to learn more.

### Method signature changes

The core methods

- `getItem`
- `setItem`
- `removeItem`
- `getAllKeys`
- `clear`

retain their signatures from v2, ensuring backward compatibility.

#### multiGet

Renamed to `getMany` and returns a `Record<string, string | null>`, following a "what you request is what you get" rule: every key you pass in the request appears in the returned object, with `null` for keys that don’t exist in storage.

```diff
-  multiGet: (
-    keys: readonly string[],
-    callback?: MultiGetCallback
-  ) => Promise<readonly KeyValuePair[]>;

+ getMany(keys: string[]): Promise<Record<string, string | null>>;
```

#### multiSet

Renamed to `setMany`, accepts a `Record<string, string>` of key-value entries.

```diff
-  multiSet: (
-    keyValuePairs: ReadonlyArray<readonly [string, string]>,
-    callback?: MultiCallback
-  ) => Promise<void>;

+ setMany(entries: Record<string, string>): Promise<void>;
```

#### multiRemove

Renamed to `removeMany`, accepts list of keys.

```diff
-  multiRemove: (
-    keys: readonly string[],
-    callback?: MultiCallback
-  ) => Promise<void>;

+ removeMany(keys: string[]): Promise<void>;
```

