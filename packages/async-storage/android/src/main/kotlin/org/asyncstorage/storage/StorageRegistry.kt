package org.asyncstorage.storage

import android.content.Context

object StorageRegistry {

    private val storages = mutableMapOf<String, PersistentStorage>()

    fun getOrCreate(ctx: Context, name: String): PersistentStorage =
        storages.getOrPut(name) { PersistentStorage(ctx, name) }
}
