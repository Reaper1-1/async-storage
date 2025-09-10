package org.asyncstorage.example.sharedstorage

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform
