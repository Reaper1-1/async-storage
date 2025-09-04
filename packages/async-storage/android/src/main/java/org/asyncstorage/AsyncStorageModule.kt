package org.asyncstorage

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = AsyncStorageModule.NAME)
class AsyncStorageModule(reactContext: ReactApplicationContext) :
    NativeAsyncStorageSpec(reactContext) {

    override fun getName(): String {
        return NAME
    }

    override fun getValues(db: String?, keys: ReadableArray?, promise: Promise?) {
        TODO("Not yet implemented")
    }

    override fun setValues(db: String?, values: ReadableArray?, promise: Promise?) {
        TODO("Not yet implemented")
    }

    override fun removeValues(db: String?, keys: ReadableArray?, promise: Promise?) {
        TODO("Not yet implemented")
    }

    override fun getKeys(db: String?, promise: Promise?) {
        TODO("Not yet implemented")
    }

    override fun clearStorage(db: String?, promise: Promise?) {
        TODO("Not yet implemented")
    }

    companion object {
        const val NAME = "RNAsyncStorage"
    }
}
