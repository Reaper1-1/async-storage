package org.asyncstorage.shared_storage

import org.asyncstorage.shared_storage.database.StorageDatabase
import org.asyncstorage.shared_storage.database.StorageEntry

// keep database internal for tests
class SharedStorage internal constructor(internal val database: StorageDatabase) {

    private val storage = database.storageDao()

    suspend fun getValues(keys: List<String>): List<StorageEntry> {
        TODO("implement getValues")
    }

    suspend fun setValues(entries: List<StorageEntry>) {
        TODO("implement setValues")
    }

    suspend fun removeValues(keys: List<String>) {
        TODO("implement removeValues")
    }

    suspend fun getKeys(): List<String> {
        TODO("implement getKeys")
    }

    suspend fun clear() {
        TODO("implement clear")
    }

    companion object
}

expect fun SharedStorage.Companion.create(
    context: PlatformContext,
    databaseName: String,
): SharedStorage

internal expect fun SharedStorage.Companion.createInMemory(context: PlatformContext): SharedStorage
