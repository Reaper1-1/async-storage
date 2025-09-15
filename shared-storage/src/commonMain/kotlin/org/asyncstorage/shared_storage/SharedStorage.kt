package org.asyncstorage.shared_storage

import kotlinx.coroutines.flow.Flow

/**
 * Cross-platform abstraction for a key-value storage backed by SQLite.
 *
 * This interface is designed to provide both direct suspend-based access and reactive Flow-based
 * access to stored values.
 */
interface SharedStorage {

    suspend fun getValues(keys: List<String>): List<Entry>

    fun getValuesFlow(keys: List<String>): Flow<List<Entry>>

    suspend fun setValues(entries: List<Entry>): List<Entry>

    suspend fun removeValues(keys: List<String>)

    suspend fun getKeys(): List<String>

    fun getKeysFlow(): Flow<List<String>>

    suspend fun clear()
}

expect fun SharedStorage(context: PlatformContext, databaseName: String): SharedStorage

internal expect fun sharedStorageInMemory(context: PlatformContext): SharedStorage
