package org.asyncstorage.shared_storage

import co.touchlab.kermit.Logger
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.map
import org.asyncstorage.shared_storage.database.DatabaseFiles
import org.asyncstorage.shared_storage.database.StorageDatabase
import org.asyncstorage.shared_storage.database.StorageEntry

/**
 * Default implementation of [SharedStorage] interface.
 *
 * Note about [getValuesFlow]: Since SQLite database trigger notifications only on table level, not
 * row level, non-observed requested keys will trigger emits. Therefor, flow returned has
 * .distinctUntilChanged to mimic row level update.
 */
internal class SharedStorageImpl(val database: StorageDatabase, files: DatabaseFiles) :
    SharedStorage {

    private val storage = database.storageDao()
    private val log = Logger.withTag("AsyncStorage:${files.databaseName}")

    init {
        log.i { "Storage opened at ${files.directoryAbsolutePath}" }
    }

    override suspend fun getValues(keys: List<String>): List<Entry> =
        catchStorageException(log) { storage.getValues(keys).map(StorageEntry::toEntry) }

    override fun getValuesFlow(keys: List<String>): Flow<List<Entry>> =
        storage
            .getValuesFlow(keys)
            .map { list -> list.map(StorageEntry::toEntry) }
            .distinctUntilChanged()
            .catchStorageException(log)

    override suspend fun setValues(entries: List<Entry>): List<Entry> =
        catchStorageException(log) {
            val values = entries.map(Entry::toStorageEntry)
            storage.setValuesAndGet(values).map(StorageEntry::toEntry)
        }

    override suspend fun removeValues(keys: List<String>) =
        catchStorageException(log) { storage.removeValues(keys) }

    override suspend fun getKeys(): List<String> = catchStorageException(log) { storage.getKeys() }

    override fun getKeysFlow(): Flow<List<String>> =
        storage.getKeysFlow().catchStorageException(log)

    override suspend fun clear() = catchStorageException(log) { storage.clear() }
}
