package tests

import org.asyncstorage.shared_storage.PlatformContext
import org.asyncstorage.shared_storage.SharedStorage
import org.asyncstorage.shared_storage.createInMemory

actual abstract class TestRunner actual constructor()

actual class StorageUtils actual constructor() {
  actual fun getStorage(): SharedStorage = SharedStorage.createInMemory(PlatformContext.Instance)
}
