package org.asyncstorage.shared_storage

import android.content.res.Resources
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.sqlite.driver.AndroidSQLiteDriver
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.newFixedThreadPoolContext
import kotlinx.coroutines.newSingleThreadContext
import org.asyncstorage.shared_storage.database.StorageDatabase
import kotlin.math.max

@Suppress("unused") // used in consumer app
@OptIn(DelicateCoroutinesApi::class, ExperimentalCoroutinesApi::class)
actual fun SharedStorage.Companion.create(
    context: PlatformContext,
    databaseName: String,
): SharedStorage {

    val dbFile = context.getDatabasePath(databaseName)
    val writeDispatcher = newSingleThreadContext("$databaseName-writer")
    val readDispatcher =
        newFixedThreadPoolContext(getWALConnectionPoolSize(), "$databaseName-reader")

    val db =
        Room.databaseBuilder<StorageDatabase>(context, name = dbFile.absolutePath)
            .setDriver(AndroidSQLiteDriver())
            .setQueryExecutor(readDispatcher.executor)
            .setTransactionExecutor(writeDispatcher.executor)
            .setJournalMode(RoomDatabase.JournalMode.WRITE_AHEAD_LOGGING)
            .build()

    return SharedStorage(db)
}

internal actual fun SharedStorage.Companion.createInMemory(
    context: PlatformContext
): SharedStorage {
    val db =
        Room.inMemoryDatabaseBuilder<StorageDatabase>(context)
            .setJournalMode(RoomDatabase.JournalMode.WRITE_AHEAD_LOGGING)
            .build()

    return SharedStorage(db)
}

// as per https://blog.p-y.wtf/parallelism-with-android-sqlite
private fun getWALConnectionPoolSize(): Int =
    try {
        val resources = Resources.getSystem()
        val resId = resources.getIdentifier("db_connection_pool_size", "integer", "android")
        if (resId != 0) {
            max(2, resources.getInteger(resId))
        } else {
            2
        }
    } catch (_: Exception) {
        2
    }
