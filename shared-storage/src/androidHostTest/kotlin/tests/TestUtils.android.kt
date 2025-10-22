package tests

import org.asyncstorage.shared_storage.SharedStorageImpl
import org.asyncstorage.shared_storage.SharedStorage
import org.asyncstorage.shared_storage.sharedStorageInMemory
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.RuntimeEnvironment
import kotlin.test.Ignore

@Ignore("Do not run this as test itself")
@RunWith(RobolectricTestRunner::class) actual open class TestRunner actual constructor()

actual class StorageUtils actual constructor() {
    private var storage: SharedStorage? = null

    actual fun getStorage(): SharedStorage {
        return sharedStorageInMemory(RuntimeEnvironment.getApplication()).also { storage = it }
    }

    actual fun cleanup() {
        storage?.let { (it as SharedStorageImpl).database.close() }
    }
}
