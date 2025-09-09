package org.asyncstorage

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import org.asyncstorage.storage.PersistentStorage

@ReactModule(name = AsyncStorageModuleName)
class AsyncStorageModule(reactContext: ReactApplicationContext) :
    NativeAsyncStorageSpec(reactContext) {

    private val storage = PersistentStorage()

    override fun getName() = AsyncStorageModuleName

    override fun getValues(db: String, keys: ReadableArray, promise: Promise) {
        storage.get(db, keys, promise)
    }

    override fun setValues(db: String, values: ReadableArray, promise: Promise) {
        storage.set(db, values, promise)
    }

    override fun removeValues(db: String, keys: ReadableArray, promise: Promise) {
        storage.remove(db, keys, promise)
    }

    override fun getKeys(db: String, promise: Promise) {
        storage.allKeys(db, promise)
    }

    override fun clearStorage(db: String, promise: Promise) {
        storage.clear(db, promise)
    }
}
