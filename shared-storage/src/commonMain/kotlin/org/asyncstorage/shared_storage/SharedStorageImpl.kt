package org.asyncstorage.shared_storage

import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.map
import org.asyncstorage.shared_storage.database.StorageDatabase
import org.asyncstorage.shared_storage.database.StorageEntry

/**
 * Default implementation of [SharedStorage] interface.
 *
 * Note about [getValuesFlow]: Since SQLite database trigger notifications only on table level, not
 * row level, non-observed requested keys will trigger emits. Therefor, flow returned has
 * .distinctUntilChanged to mimic row level update.
 */
internal class SharedStorageImpl(val database: StorageDatabase) : SharedStorage {

    private val storage = database.storageDao()

    override suspend fun getValues(keys: List<String>): List<Entry> = catchStorageException {
        storage.getValues(keys).map(StorageEntry::toEntry)
    }

    override fun getValuesFlow(keys: List<String>): Flow<List<Entry>> =
        storage
            .getValuesFlow(keys)
            .map { list -> list.map(StorageEntry::toEntry) }
            .distinctUntilChanged()
            .catchStorageException()

    override suspend fun setValues(entries: List<Entry>): List<Entry> = catchStorageException {
        val values = entries.map(Entry::toStorageEntry)
        storage.setValuesAndGet(values).map(StorageEntry::toEntry)
    }

    override suspend fun removeValues(keys: List<String>) = catchStorageException {
        storage.removeValues(keys)
    }

    override suspend fun getKeys(): List<String> = catchStorageException { storage.getKeys() }

    override fun getKeysFlow(): Flow<List<String>> = storage.getKeysFlow().catchStorageException()

    override suspend fun clear() = catchStorageException { storage.clear() }
}
