# Migration to v3

AsyncStorage v3 introduces some breaking changes to simplify the API and make it more consistent.

## AsyncStorage instance needs to be created now

AsyncStorage v3 introduced scoped storages, which needs to be created before use. Head to [Usage page](api/usage.md#creating-a-storage) to learn more.

## Default export points to v2 storage

To make transition easier, the default export still points to the v2 storage implementation, ensuring that no existing data is lost.

## Removed callback arguments

All methods now return Promises, and callbacks have been removed from all methods.

## Removed merge functionality

AsyncStorage's "merge" behavior has historically been inconsistent across platforms. Rather than enforcing a platform-specific merging strategy, the merge API has been removed to avoid ambiguity.

## Method signature changes

The core methods

- `getItem`
- `setItem`
- `removeItem`
- `getAllKeys`
- `clear`

retain their signatures from v2, ensuring backward compatibility.

### multiGet

Renamed to `getMany` and returns a `Record<string, string | null>`, following a "what you request is what you get" rule: every key you pass in the request appears in the returned object, with `null` for keys that don’t exist in storage.

```diff
-  multiGet: (
-    keys: readonly string[],
-    callback?: MultiGetCallback
-  ) => Promise<readonly KeyValuePair[]>;

+ getMany(keys: string[]): Promise<Record<string, string | null>>;
```

### multiSet

Renamed to `setMany`, accepts a `Record<string, string>` of key-value entries.

```diff
-  multiSet: (
-    keyValuePairs: ReadonlyArray<readonly [string, string]>,
-    callback?: MultiCallback
-  ) => Promise<void>;

+ setMany(entries: Record<string, string>): Promise<void>;
```

### multiRemove

Renamed to `removeMany`, accepts list of keys.

```diff
-  multiRemove: (
-    keys: readonly string[],
-    callback?: MultiCallback
-  ) => Promise<void>;

+ removeMany(keys: string[]): Promise<void>;
```

## Errors are more predictable now

All errors now thrown from `AsyncStorage` are instances of `AsyncStorageError` containing `type` of the error it represents. Head over to [Errors page](api/errors.md) to learn more.
