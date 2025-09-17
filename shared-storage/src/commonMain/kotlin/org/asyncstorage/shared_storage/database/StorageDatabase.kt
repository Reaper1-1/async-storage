package org.asyncstorage.shared_storage.database

import androidx.room.*
import kotlinx.coroutines.flow.Flow

private const val DATABASE_VERSION = 1

@Entity(tableName = "entries")
internal data class StorageEntry(@PrimaryKey val key: String, val value: String?)

@Dao
internal interface StorageDao {

    @Query("SELECT * FROM storage WHERE `key` IN (:keys)")
    suspend fun getValues(keys: List<String>): List<StorageEntry>

    @Query("SELECT * FROM storage WHERE `key` IN (:keys)")
    fun getValuesFlow(keys: List<String>): Flow<List<StorageEntry>>

    @Transaction
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun setValues(entries: List<StorageEntry>)

    @Transaction
    suspend fun setValuesAndGet(entries: List<StorageEntry>): List<StorageEntry> {
        setValues(entries)
        return getValues(entries.map { it.key })
    }

    @Transaction
    @Query("DELETE FROM storage WHERE `key` in (:keys)")
    suspend fun removeValues(keys: List<String>)

    @Query("SELECT `key` FROM storage") suspend fun getKeys(): List<String>

    @Query("SELECT `key` FROM storage") fun getKeysFlow(): Flow<List<String>>

    @Transaction @Query("DELETE FROM storage") suspend fun clear()
}

@Database(entities = [StorageEntry::class], version = DATABASE_VERSION, exportSchema = true)
@ConstructedBy(StorageDatabaseConstructor::class)
abstract class StorageDatabase : RoomDatabase() {
    internal abstract fun storageDao(): StorageDao

    companion object
}

expect object StorageDatabaseConstructor : RoomDatabaseConstructor<StorageDatabase> {
    override fun initialize(): StorageDatabase
}
