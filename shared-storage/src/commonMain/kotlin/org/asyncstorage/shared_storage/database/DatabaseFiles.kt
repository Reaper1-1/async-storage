package org.asyncstorage.shared_storage.database

import org.asyncstorage.shared_storage.PlatformContext

@ConsistentCopyVisibility
data class DatabaseFiles
internal constructor(val databaseName: String, private val platformDbDirectory: String) {

    val databaseFileName = databaseName.removeSuffix(".") + ".$EXT_NAME"

    val directoryAbsolutePath: String
        get() = platformDbDirectory.removeSuffix("/") + "/$GROUP_DIR_NAME" + "/databases/$databaseName"

    val fileAbsolutePath: String
        get() = directoryAbsolutePath.removeSuffix("/") + "/$databaseFileName"

    companion object Companion {
        internal const val EXT_NAME = "sqlite"
        internal const val GROUP_DIR_NAME = "async-storage"
    }
}

expect fun DatabaseFiles.Companion.of(
    context: PlatformContext,
    databaseName: String,
): DatabaseFiles
