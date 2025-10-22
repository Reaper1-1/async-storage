---
title: Usage
---

# Using Async Storage

The [
`AsyncStorage`](https://github.com/react-native-async-storage/async-storage/blob/main/packages/async-storage/src/AsyncStorage.ts)
interface provides a promise-based API for persistent key-value storage.
It mirrors the Web Storage API, with additional support for batch operations.

**Note:** AsyncStorage only stores strings. To save objects, arrays, or other non-string values, serialize them with
`JSON.stringify` before storing, and use `JSON.parse` when reading them back.

## Creating a storage

Create a new storage instance by calling `createAsyncStorage` with a unique database name:

!!! note "Naming"

    Avoid including file extensions in the database name (like "user.db"). See [Database naming](db-naming.md) for details.

```typescript
import { createAsyncStorage } from "@react-native-async-storage/async-storage";

const userStorage = createAsyncStorage("john");
```

Each instance is uniquely identified by its name.
Data in one storage instance is isolated, ensuring that different names do not share data.

!!! note "Web"

    On the Web, AsyncStorage uses [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), which supports scoped storages.

!!! warning "Windows"

    Windows does not support scoped storages. It falls back to the previous v2 implementation, which provides a single storage per application.

!!! warning "visionOS"

    visionOS does not support scoped storages. It falls back to the previous v2 implementation, which provides a single storage per application.


## Using a storage

After creating a storage instance, the storage is ready to use.

### Single item operations

You can store, retrieve, and remove individual keys using `setItem`, `getItem`, and `removeItem`.

Note that:

- `setItem` overwrites the current value if the key already exists.
- `removeItem` does nothing if the key does not exist; it does not throw an error.

```typescript
await userStorage.setItem("username", "doe_john");
// previously stored value is overriden
await userStorage.setItem("username", "john_doe");

// read current value
let username = await userStorage.getItem("username");
console.log(username); // "john_doe"

await userStorage.removeItem("username");
// does nothing, item is already removed
await userStorage.removeItem("username");

username = await userStorage.getItem("username");
console.log(username); // null
```

### Batch operations

Use batch methods to handle multiple keys at once. These operations are performed atomically: either all changes are
applied, or none if an error occurs.

- `setMany` stores multiple key-value pairs.
- `getMany` retrieves multiple keys at once, returning `null` for any keys that don’t exist.
- `removeMany` deletes multiple keys; non-existing keys are ignored without errors.

```typescript
// store values
await userStorage.setMany({
  email: "john@example.com",
  age: "30",
});

// read multiple items
const data = await userStorage.getMany(["email", "age", "username"]);
console.log(data);
// {
//   email: "john@example.com",
//   age: "30",
//   username: null, // key doesn't exist
// }

// remove multiple items
// non-existing keys are ignored
await userStorage.removeMany(["email", "age", "not-here"]);
```

### Read all keys

To retrieve all keys currently used in the storage instance, use `getAllKeys`:

```typescript
await userStorage.setMany({
  email: "john@example.com",
  age: "30",
});

const keys = await userStorage.getAllKeys();
console.log(keys); // ["email", "age"]
```

### Clearing storage

To remove all data from a storage instance, use `clear`:

```typescript
await userStorage.setMany({
  email: "john@example.com",
  age: "30",
});

await userStorage.clear();
const keys = await userStorage.getAllKeys();
console.log(keys); // []
```
