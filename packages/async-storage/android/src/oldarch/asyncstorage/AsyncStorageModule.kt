package org.asyncstorage

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import org.asyncstorage.storage.PersistentStorage

@ReactModule(name = AsyncStorageModuleName)
class AsyncStorageModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val storage = PersistentStorage()

    override fun getName() = AsyncStorageModuleName

    @ReactMethod
    fun getValues(db: String, keys: ReadableArray, promise: Promise) {
        storage.get(db, keys, promise)
    }

    @ReactMethod
    fun setValues(db: String, values: ReadableArray, promise: Promise) {
        storage.set(db, values, promise)
    }

    @ReactMethod
    fun removeValues(db: String, keys: ReadableArray, promise: Promise) {
        storage.remove(db, keys, promise)
    }

    @ReactMethod
    fun getKeys(db: String, promise: Promise) {
        storage.allKeys(db, promise)
    }

    @ReactMethod
    fun clearStorage(db: String, promise: Promise) {
        storage.clear(db, promise)
    }

    companion object {
        const val NAME = "RNAsyncStorage"
    }
}
