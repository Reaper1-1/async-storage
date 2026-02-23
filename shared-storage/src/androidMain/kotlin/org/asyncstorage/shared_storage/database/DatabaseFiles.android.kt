package org.asyncstorage.shared_storage.database

import android.content.Context
import org.asyncstorage.shared_storage.PlatformContext

actual fun DatabaseFiles.Companion.of(
    context: PlatformContext,
    databaseName: String,
): DatabaseFiles {
    return DatabaseFiles(databaseName, getDatabasePath(context))
}

internal fun DatabaseFiles.Companion.ofInMemory(): DatabaseFiles {
    return DatabaseFiles("in-memory", "/")
}

private fun getDatabasePath(ctx: Context): String {
    val parent = ctx.getDatabasePath("temp").parentFile!!
    return parent.absolutePath.removeSuffix("/")
}
