package org.asyncstorage.shared_storage

actual abstract class PlatformContext {
    companion object Instance : PlatformContext()
}
