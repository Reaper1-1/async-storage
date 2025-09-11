package org.asyncstorage.shared_storage

import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.map
import org.asyncstorage.shared_storage.database.StorageDatabase
import org.asyncstorage.shared_storage.database.StorageEntry

/**
 * Persistent Storage backed by SQLite.
 *
 * Note about [getValuesFlow]: Since SQLite database trigger notifications only on table level, not
 * row level, non-observed requested keys will trigger emits. Therefor, flow returned has
 * .distinctUntilChanged to mimic row level update.
 */
class SharedStorage internal constructor(internal val database: StorageDatabase) {

    private val storage = database.storageDao()

    suspend fun getValues(keys: List<String>): List<Entry> {
        return storage.getValues(keys).map(StorageEntry::toEntry)
    }

    fun getValuesFlow(keys: List<String>): Flow<List<Entry>> =
        storage
            .getValuesFlow(keys)
            .map { list -> list.map(StorageEntry::toEntry) }
            .distinctUntilChanged()

    suspend fun setValues(entries: List<Entry>): List<Entry> {
        val values = entries.map(Entry::toStorageEntry)
        return storage.setValuesAndGet(values).map(StorageEntry::toEntry)
    }

    suspend fun removeValues(keys: List<String>) {
        return storage.removeValues(keys)
    }

    suspend fun getKeys(): List<String> {
        return storage.getKeys()
    }

    fun getKeysFlow(): Flow<List<String>> = storage.getKeysFlow()

    suspend fun clear() {
        storage.clear()
    }

    companion object
}

expect fun SharedStorage.Companion.create(
    context: PlatformContext,
    databaseName: String,
): SharedStorage

internal expect fun SharedStorage.Companion.createInMemory(context: PlatformContext): SharedStorage
