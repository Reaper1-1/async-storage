## How `databaseName` is used

When creating a new storage instance with `createAsyncStorage(databaseName)`, the provided `databaseName` determines the
location and structure of the underlying database file on each platform.  
This ensures that each storage instance is scoped by name and prevents data from leaking between instances.

### iOS & macOS

On Apple platforms, storage is located in the app’s `Application Support` directory.  
The `databaseName` is normalized into a file path with the `.sqlite` extension, and each `databaseName` creates its own
subdirectory inside `async-storage/databases`.

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

On Android, databases are stored in the app’s internal files directory.  
The `databaseName` is normalized into a file path with the `.sqlite` extension, and each `databaseName` creates its own
subdirectory inside `async-storage/databases`.

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

On the Web, `databaseName` corresponds directly to the name of the IndexedDB database.  
Although the `async-storage` grouping is abstracted away, the name remains unique across instances.

Example:

```typescript
const userId = "1234";
createAsyncStorage(`user-${userId}`);
```

Creates database named `user-1234`:

![web-db-naming-1.png](../assets/db-naming-web-1.png)

### Windows and visionOS

Creating multiple storages is not supported on Windows and visionOS targets.
