package org.asyncstorage

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import org.asyncstorage.storage.StorageRegistry

@ReactModule(name = AsyncStorageModule.NAME)
class AsyncStorageModule(private val reactContext: ReactApplicationContext) :
    NativeAsyncStorageSpec(reactContext) {

    override fun getName() = NAME

    override fun getValues(db: String, keys: ReadableArray, promise: Promise) {
        StorageRegistry.getOrCreate(reactContext, db).run { get(keys, promise) }
    }

    override fun setValues(db: String, values: ReadableArray, promise: Promise) {
        StorageRegistry.getOrCreate(reactContext, db).run { set(values, promise) }
    }

    override fun removeValues(db: String, keys: ReadableArray, promise: Promise) {
        StorageRegistry.getOrCreate(reactContext, db).run { remove(keys, promise) }
    }

    override fun getKeys(db: String, promise: Promise) {
        StorageRegistry.getOrCreate(reactContext, db).run { allKeys(promise) }
    }

    override fun clearStorage(db: String, promise: Promise) {
        StorageRegistry.getOrCreate(reactContext, db).run { clear(promise) }
    }

    companion object {
        const val NAME = "RNAsyncStorage"
    }
}
