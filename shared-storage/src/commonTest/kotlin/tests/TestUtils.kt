package tests

import org.asyncstorage.shared_storage.SharedStorage

expect open class TestRunner()

expect class StorageUtils() {
    fun getStorage(): SharedStorage
}
