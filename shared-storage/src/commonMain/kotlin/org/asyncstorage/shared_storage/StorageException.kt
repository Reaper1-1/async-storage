package org.asyncstorage.shared_storage

import androidx.sqlite.SQLiteException
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.catch

sealed class StorageException(message: String, cause: Throwable?) : Exception(message, cause) {

    /** Catch exception thrown by sqlite itself https://www.sqlite.org/rescode.html */
    class SqliteException(message: String, cause: Throwable?) : StorageException(message, cause)

    class OtherException(message: String, cause: Throwable?) : StorageException(message, cause)
}

internal suspend fun <T> catchStorageException(block: suspend () -> T): T {
    try {
        return block()
    } catch (e: CancellationException) {
        throw e
    } catch (e: Throwable) {
        throw e.asStorageException()
    }
}

internal fun <T> Flow<T>.catchStorageException(): Flow<T> = catch { throw it }

private fun Throwable.asStorageException(): StorageException {
    if (this is SQLiteException) {
        return StorageException.SqliteException(
            message ?: "Unexcepted Sqlite exception: ${this::class.qualifiedName}",
            cause,
        )
    }

    return StorageException.OtherException(
        message ?: "Unknown storage exception: ${this::class.qualifiedName}",
        cause,
    )
}
