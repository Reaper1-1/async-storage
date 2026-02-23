package org.asyncstorage.shared_storage

import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.Flow

/**
 * Cross-platform abstraction for a key-value storage backed by SQLite.
 *
 * This interface is designed to provide both direct suspend-based access and reactive Flow-based
 * access to stored values.
 */
interface SharedStorage {

    @Throws(StorageException::class, CancellationException::class)
    suspend fun getValues(keys: List<String>): List<Entry>

    @Throws(StorageException::class)
    fun getValuesFlow(keys: List<String>): Flow<List<Entry>>

    @Throws(StorageException::class, CancellationException::class)
    suspend fun setValues(entries: List<Entry>): List<Entry>

    @Throws(StorageException::class, CancellationException::class)
    suspend fun removeValues(keys: List<String>)

    @Throws(StorageException::class, CancellationException::class)
    suspend fun getKeys(): List<String>

    @Throws(StorageException::class)
    fun getKeysFlow(): Flow<List<String>>

    @Throws(StorageException::class, CancellationException::class)
    suspend fun clear()
}

expect fun SharedStorage(context: PlatformContext, databaseName: String): SharedStorage

internal expect fun sharedStorageInMemory(context: PlatformContext): SharedStorage
