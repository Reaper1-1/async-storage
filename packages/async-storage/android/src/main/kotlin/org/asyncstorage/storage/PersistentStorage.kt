package org.asyncstorage.storage

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableArray

class PersistentStorage {
    fun get(db: String, rnKeys: ReadableArray, promise: Promise) {
        // rnKeys.toArrayList().map { it.toString() }
        promise.reject("ERR_01", "get not implemented")
    }

    fun set(db: String, values: ReadableArray, promise: Promise) {
        promise.reject("ERR_01", "set not implemented")
    }

    fun remove(db: String, keys: ReadableArray, promise: Promise) {
        promise.reject("ERR_01", "remove not implemented")
    }

    fun allKeys(db: String, promise: Promise) {
        promise.reject("ERR_01", "allKeys not implemented")
    }

    fun clear(db: String, promise: Promise) {
        promise.reject("ERR_01", "clear not implemented")
    }
}
