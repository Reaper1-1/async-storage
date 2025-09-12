package org.asyncstorage.storage

import android.content.Context
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableArray
import kotlin.coroutines.CoroutineContext
import kotlin.coroutines.EmptyCoroutineContext
import kotlinx.coroutines.CoroutineName
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.coroutines.plus
import org.asyncstorage.shared_storage.SharedStorage
import org.asyncstorage.shared_storage.create

private val StorageScope = { name: String -> CoroutineScope(SupervisorJob() + CoroutineName(name)) }

/**
 * todo:
 * - handle exceptions via coroutine exception handler or via try catch
 */
class PersistentStorage(
    ctx: Context,
    dbName: String,
    coroutineContext: CoroutineContext = EmptyCoroutineContext,
) {
    private val scope = StorageScope(dbName) + coroutineContext
    private val db = SharedStorage.create(ctx, dbName)

    fun get(rnKeys: ReadableArray, promise: Promise) {
        scope.launch {
            val keys = rnKeys.toKeyList()
            val result = db.getValues(keys).toRNResults()
            promise.resolve(result)
        }
    }

    fun set(values: ReadableArray, promise: Promise) {
        scope.launch {
            val entries = values.toEntryList()
            val result = db.setValues(entries).toRNResults()
            promise.resolve(result)
        }
    }

    fun remove(keys: ReadableArray, promise: Promise) {
        scope.launch {
            db.removeValues(keys.toKeyList())
            promise.resolve(null)
        }
    }

    fun allKeys(promise: Promise) {
        scope.launch {
            val result = db.getKeys().toRNKeys()
            promise.resolve(result)
        }
    }

    fun clear(promise: Promise) {
        scope.launch {
            db.clear()
            promise.resolve(null)
        }
    }
}
