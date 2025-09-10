package org.asyncstorage.shared_storage

actual fun SharedStorage.Companion.create(
    context: PlatformContext,
    databaseName: String
): SharedStorage {
  TODO("JVM Not yet implemented")
}

internal actual fun SharedStorage.Companion.createInMemory(
    context: PlatformContext
): SharedStorage {
  TODO("JVM Not yet implemented")
}
