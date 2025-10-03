## How `databaseName` is used

When creating a new storage instance with `createAsyncStorage(databaseName)`, the provided `databaseName` determines where and how the underlying database file is stored on each platform.
This ensures that storages are scoped by name and do not leak data between one another.

### iOS & macOS

On Apple platforms, the storage is located under the app’s `Application Support` directory.
The `databaseName` is normalized into a file path with the `.sqlite` extension.
Each `databaseName` creates its own subdirectory inside `async-storage/databases`.

Directory:

```text
<Application Support>/async-storage/databases/<databaseName>/
```

File:

```text
<Application Support>/async-storage/databases/<databaseName>/<databaseName>.sqlite
```

Example:

```typescript
const userId = "1234";
createAsyncStorage(`user-${userId}`);

// creates:
// <Application Support>/async-storage/databases/user-1234/user-1234.sqlite
```

### Android

On Android, databases are stored inside the app’s internal files directory.
The `databaseName` is normalized into a file path with the `.sqlite` extension.
Each `databaseName` creates its own subdirectory inside `async-storage/databases`.

Directory:

```text
<App Files Dir>/async-storage/databases/<databaseName>/
```

File:

```text
<App Files Dir>/async-storage/databases/<databaseName>/<databaseName>.sqlite
```

Example:

```typescript
const userId = "1234";
createAsyncStorage(`user-${userId}`);

// creates:
// <App Files Dir>/async-storage/databases/user-1234/user-1234.sqlite
```

### Web

On Web, `databaseName` corresponds directly to the name of the IndexedDB database.
The `async-storage` grouping is abstracted away, but the uniqueness of the name is still guaranteed.

Example:

```typescript
const userId = "1234";
createAsyncStorage(`user-${userId}`);
```

Creates database named `user-1234`:

![web-db-naming-1.png](/assets/db-naming-web-1.png)

### Windows

On Windows, scoped storages are not supported.
The API always falls back to the legacy v2 storage implementation, which ignores `databaseName`.
