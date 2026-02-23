package tests

import org.asyncstorage.shared_storage.SharedStorageImpl
import org.asyncstorage.shared_storage.PlatformContext
import org.asyncstorage.shared_storage.SharedStorage
import org.asyncstorage.shared_storage.sharedStorageInMemory

actual open class TestRunner actual constructor()

actual class StorageUtils actual constructor() {
    private var storage: SharedStorage? = null

    actual fun getStorage(): SharedStorage {
        return sharedStorageInMemory(PlatformContext.Instance).also { storage = it }
    }

    actual fun cleanup() {
        storage?.let { (it as SharedStorageImpl).database.close() }
    }
}
