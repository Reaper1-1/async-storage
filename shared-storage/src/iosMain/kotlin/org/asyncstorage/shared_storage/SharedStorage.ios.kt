package org.asyncstorage.shared_storage

import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.sqlite.driver.bundled.BundledSQLiteDriver
import kotlinx.cinterop.ExperimentalForeignApi
import org.asyncstorage.shared_storage.database.StorageDatabase
import platform.Foundation.NSApplicationSupportDirectory
import platform.Foundation.NSFileManager
import platform.Foundation.NSUserDomainMask

actual fun SharedStorage.Companion.create(
    context: PlatformContext,
    databaseName: String,
): SharedStorage {
    val dbFilePath = documentDirectory().removeSuffix("/") + "/${databaseName}"
    val db =
        Room.databaseBuilder<StorageDatabase>(name = dbFilePath)
            .setJournalMode(RoomDatabase.JournalMode.WRITE_AHEAD_LOGGING)
            .setDriver(BundledSQLiteDriver())
            .build()

    return SharedStorage(database = db)
}

internal actual fun SharedStorage.Companion.createInMemory(
    context: PlatformContext
): SharedStorage {
    val db =
        Room.inMemoryDatabaseBuilder<StorageDatabase>()
            .setJournalMode(RoomDatabase.JournalMode.WRITE_AHEAD_LOGGING)
            .setDriver(BundledSQLiteDriver())
            .build()

    return SharedStorage(database = db)
}

@OptIn(ExperimentalForeignApi::class)
private fun documentDirectory(): String {
    val documentDirectory =
        NSFileManager.defaultManager.URLForDirectory(
            directory = NSApplicationSupportDirectory,
            inDomain = NSUserDomainMask,
            appropriateForURL = null,
            create = false,
            error = null,
        )
    return requireNotNull(documentDirectory?.path)
}
