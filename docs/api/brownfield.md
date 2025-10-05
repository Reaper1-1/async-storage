!!! info

    Brownfield integration is supported on **Android**, **iOS** and **macOS**.

`AsyncStorage` is built on a shared storage layer (`SharedStorage`) that can also be accessed directly from native code.
This is useful in brownfield scenarios, where your app combines React Native and native code, and you want both layers to read/write from the same storage consistently.

All platforms provide a thread-safe singleton registry called `StorageRegistry` to manage storage instances.

### Android

On Android, `StorageRegistry` is public singleton, which is used to share `SharedStorage` instances with Native module.
Multiple calls with the same name return the same singleton instance, ensuring consistent access.

```kotlin
import android.content.Context
import org.asyncstorage.shared_storage.SharedStorage
import org.asyncstorage.storage.StorageRegistry
import kotlinx.coroutines.runBlocking

// access shared storage via StorageRegistry
val storage: SharedStorage = StorageRegistry.getStorage(ctx, "my-users")

runBlocking {
    storage.setValues(listOf(Entry("email", "john@example.com")))
    val values = storage.getValues(listOf("email"))
    println("Stored email: ${values.firstOrNull()?.value}")
}
```


### iOS / macOS

On iOS/macOS, the `StorageRegistry` singleton provides the same functionality in Swift/Objc.

```swift
import SharedAsyncStorage

// access shared storage via StorageRegistry
let storage: SharedStorage = StorageRegistry.shared.getStorage(dbName: "my-users")

Task {
    storage.setValues([Entry(key: "email", value: "john@example.com")])
    let values = storage.getValues(keys: ["email"])
    print("Stored email: \(values.first?.value ?? "none")")
}
```
