package org.asyncstorage.shared_storage

import androidx.sqlite.SQLiteException
import co.touchlab.kermit.Logger
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.catch

sealed class StorageException(message: String, cause: Throwable?) : Exception(message, cause) {

    /** Catch exception thrown by sqlite itself https://www.sqlite.org/rescode.html */
    class SqliteException(message: String, cause: Throwable?) : StorageException(message, cause)

    class OtherException(message: String, cause: Throwable?) : StorageException(message, cause)
}

internal suspend fun <T> catchStorageException(log: Logger, block: suspend () -> T): T {
    try {
        return block()
    } catch (e: CancellationException) {
        log.i { "operation cancelled" }
        throw e
    } catch (e: Throwable) {
        throw e.asStorageException(log)
    }
}

internal fun <T> Flow<T>.catchStorageException(log: Logger): Flow<T> = catch {
    throw it.asStorageException(log)
}

private fun Throwable.asStorageException(log: Logger): StorageException {
    if (this is SQLiteException) {
        return StorageException.SqliteException(
                message ?: "Unexcepted Sqlite exception: ${this::class.qualifiedName}",
                cause,
            )
            .also { log.w(throwable = this) { "Sqlite exception caught: ${this.message}" } }
    }

    return StorageException.OtherException(
            message ?: "Unknown storage exception: ${this::class.qualifiedName}",
            cause,
        )
        .also { log.w(throwable = this) { "Unknown storage exception caught: ${this.message}" } }
}
