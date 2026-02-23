package org.asyncstorage.shared_storage

import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.sqlite.driver.bundled.BundledSQLiteDriver
import org.asyncstorage.shared_storage.database.DatabaseFiles
import org.asyncstorage.shared_storage.database.StorageDatabase
import org.asyncstorage.shared_storage.database.of
import org.asyncstorage.shared_storage.database.ofInMemory

@Suppress("unused") // used on iOS side
actual fun SharedStorage(context: PlatformContext, databaseName: String): SharedStorage {
    val dbFiles = DatabaseFiles.of(PlatformContext, databaseName)

    val db =
        Room.databaseBuilder<StorageDatabase>(name = dbFiles.fileAbsolutePath)
            .setJournalMode(RoomDatabase.JournalMode.WRITE_AHEAD_LOGGING)
            .setDriver(BundledSQLiteDriver())
            .build()

    return SharedStorageImpl(database = db, files = dbFiles)
}

internal actual fun sharedStorageInMemory(context: PlatformContext): SharedStorage {
    val db =
        Room.inMemoryDatabaseBuilder<StorageDatabase>()
            .setJournalMode(RoomDatabase.JournalMode.WRITE_AHEAD_LOGGING)
            .setDriver(BundledSQLiteDriver())
            .build()

    return SharedStorageImpl(database = db, DatabaseFiles.ofInMemory())
}
