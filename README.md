# React Native Async Storage

Async Storage is an asynchronous, unencrypted, persistent key-value storage solution for your React Native application.
It provides a simple API compatible with the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API), with additional extensions for batch operations and multi-database support.


## Supported platforms

- **Android** (SQLite backend via Room KMP)
- **iOS** (SQLite backend via Room KMP)
- **Web** (IndexedDB backend)
- **macOS** (SQLite backend via Room KMP)
- **Windows** (legacy fallback, single database only)


## Supported versions

| Component                | Minimum Version |
|--------------------------|-----------------|
| kotlin                   | 2.1.0           |
| ios/android React Native | 0.76            |
| android min sdk          | 24              |
| macOS React Native       | 0.78            |
| macOS min target         | 12              |


---

## Installation

```shell
# Using npm
npm install @react-native-async-storage/async-storage

# Using yarn
yarn add @react-native-async-storage/async-storage
```

### Android

Inside your `android/build.gradle(.kts)` file, add link to local maven repo:

```groovy
allprojects {
    repositories {
        // ... others like google(), mavenCentral()

        maven {
            url = uri(project(":react-native-async-storage_async-storage").file("local_repo"))
            // or uri("path/to/node_modules/@react-native-async-storage/async-storage/android/local_repo")
        }
    }
}
```

### iOS/macOS

Install cocoapods dependencies:

```shell
# inside macos/ios directory
pod install
```

## Usage

```typescript
import { createAsyncStorage } from "@react-native-async-storage/async-storage";

// create a storage instance
const storage = createAsyncStorage("appDB");

async function demo() {
  // save value under "userToken" key
  await storage.setItem("userToken", "abc123");

  // read value stored at "userToken" key
  const token = await storage.getItem("userToken");
  console.log("Stored token:", token); // abc123

  // remove value from storage
  await storage.removeItem("userToken");
}
```

Head over to [Usage page](api/usage.md) to learn more.


## License

MIT