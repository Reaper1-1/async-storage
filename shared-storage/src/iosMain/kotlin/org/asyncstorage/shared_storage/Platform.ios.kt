package org.asyncstorage.shared_storage

actual fun platform() = "iOS"

actual abstract class PlatformContext {
    companion object Instance : PlatformContext()
}
