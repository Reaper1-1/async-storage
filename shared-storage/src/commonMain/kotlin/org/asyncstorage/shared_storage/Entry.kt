package org.asyncstorage.shared_storage

import org.asyncstorage.shared_storage.database.StorageEntry

data class Entry(val key: String, val value: String?)

internal fun Entry.toStorageEntry(): StorageEntry = StorageEntry(key, value)

internal fun StorageEntry.toEntry(): Entry = Entry(key, value)
