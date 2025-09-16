package org.asyncstorage.shared_storage.database

import kotlinx.cinterop.*
import org.asyncstorage.shared_storage.PlatformContext
import platform.Foundation.*

@Throws(IllegalStateException::class, IllegalArgumentException::class)
actual fun DatabaseFiles.Companion.of(
    context: PlatformContext,
    databaseName: String,
): DatabaseFiles {
    val databasePath = getDatabasesPath()
    return DatabaseFiles(databaseName, databasePath).also {
        createDbDirectory(it.directoryAbsolutePath)
    }
}

internal fun DatabaseFiles.Companion.ofInMemory(): DatabaseFiles {
    return DatabaseFiles("in-memory", "/")
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

        return supportDir.removeSuffix("/") + "/${bundleId.removeSuffix("/")}"
    }
}
