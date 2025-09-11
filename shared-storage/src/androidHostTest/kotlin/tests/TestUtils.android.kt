package tests

import org.asyncstorage.shared_storage.SharedStorage
import org.asyncstorage.shared_storage.createInMemory
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.RuntimeEnvironment

@RunWith(RobolectricTestRunner::class) actual open class TestRunner actual constructor()

actual class StorageUtils actual constructor() {
    private var storage: SharedStorage? = null

    actual fun getStorage(): SharedStorage {
        storage?.database?.close()

        return SharedStorage.createInMemory(RuntimeEnvironment.getApplication()).also {
            storage = it
        }
    }
}
