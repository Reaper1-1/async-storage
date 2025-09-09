package org.asyncstorage.storage

typealias Storage = String

object StorageRegistry {

    private val storages = mutableMapOf<String, Storage>()

    fun getOrCreate(name: String): Storage =
        storages.getOrPut(name) {
            // todo: create Storage
            name
        }
}
