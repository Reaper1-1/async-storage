package tests

import org.asyncstorage.shared_storage.PlatformContext
import org.asyncstorage.shared_storage.SharedStorage
import org.asyncstorage.shared_storage.createInMemory

actual open class TestRunner actual constructor()

actual class StorageUtils actual constructor() {
    private var storage: SharedStorage? = null

    actual fun getStorage(): SharedStorage {
        return SharedStorage.createInMemory(PlatformContext.Instance).also { storage = it }
    }

    actual fun cleanup() {
        storage?.database?.close()
    }
}
