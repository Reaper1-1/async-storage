package org.asyncstorage.shared_storage.database

import androidx.room.*

private const val DATABASE_VERSION = 3

@Entity(tableName = "storage")
data class StorageEntry(@PrimaryKey val key: String, val value: String?)

@Dao
internal interface StorageDao {

  @Query("SELECT * FROM storage WHERE `key` IN (:keys)")
  suspend fun getValues(keys: List<String>): List<StorageEntry>

  @Transaction
  @Insert(onConflict = OnConflictStrategy.REPLACE)
  suspend fun setValues(entries: List<StorageEntry>)

  @Transaction
  @Query("DELETE FROM storage WHERE `key` in (:keys)")
  suspend fun removeValues(keys: List<String>)

  @Query("SELECT `key` FROM storage") suspend fun getKeys(): List<String>

  @Transaction @Query("DELETE FROM storage") suspend fun clear()
}

@Database(entities = [StorageEntry::class], version = DATABASE_VERSION, exportSchema = true)
@ConstructedBy(StorageDatabaseConstructor::class)
abstract class StorageDatabase : RoomDatabase() {
  internal abstract fun storageDao(): StorageDao

  companion object
}

// The Room compiler generates the `actual` implementations.
@Suppress("KotlinNoActualForExpect")
expect object StorageDatabaseConstructor : RoomDatabaseConstructor<StorageDatabase> {
  override fun initialize(): StorageDatabase
}
