package org.asyncstorage.shared_storage

import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.sqlite.driver.bundled.BundledSQLiteDriver
import kotlinx.cinterop.*
import org.asyncstorage.shared_storage.database.StorageDatabase
import platform.Foundation.*

@Suppress("unused") // used on iOS side
actual fun SharedStorage.Companion.create(
    context: PlatformContext,
    databaseName: String,
): SharedStorage {
    val databases = getDatabasesPath()
    createDbDirectory(databases)
    val dbFilePath = "$databases/$databaseName"
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

@OptIn(ExperimentalForeignApi::class, BetaInteropApi::class)
private fun createDbDirectory(dir: String) {
    val fs = NSFileManager.defaultManager
    val url = NSURL.URLWithString(dir)
    requireNotNull(url)

    if (!fs.fileExistsAtPath(dir)) {
        memScoped {
            val errorPtr = alloc<ObjCObjectVar<NSError?>>()
            fs.createDirectoryAtPath(
                path = dir,
                withIntermediateDirectories = true,
                attributes = null,
                error = errorPtr.ptr,
            )
            errorPtr.value?.let { error(it.localizedDescription) }
        }
    }

    // exclude databases directory from iCloud backup
    url.setResourceValue(value = true, forKey = NSURLIsExcludedFromBackupKey, error = null)
}

@OptIn(ExperimentalForeignApi::class, BetaInteropApi::class)
private fun getDatabasesPath(): String {
    memScoped {
        val errorPtr = alloc<ObjCObjectVar<NSError?>>()

        val supportDirUrl =
            NSFileManager.defaultManager.URLForDirectory(
                directory = NSApplicationSupportDirectory,
                inDomain = NSUserDomainMask,
                appropriateForURL = null,
                create = false,
                error = errorPtr.ptr,
            )

        errorPtr.value?.let { error(it.localizedDescription) }
        val supportDir = supportDirUrl?.path
        requireNotNull(supportDir)

        val bundleId = NSBundle.mainBundle.bundleIdentifier ?: "AsyncStorageDatabases"
        val databaseDir = "databases"

        return supportDir.removeSuffix("/") + "/${bundleId.removeSuffix("/")}" + "/$databaseDir"
    }
}
