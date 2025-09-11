package tests

import kotlinx.coroutines.test.runTest
import org.asyncstorage.shared_storage.SharedStorage
import kotlin.test.BeforeTest
import kotlin.test.Test
import kotlin.test.assertEquals

class SharedStorageTest : TestRunner() {
    val utils = StorageUtils()
    private lateinit var storage: SharedStorage

    @BeforeTest
    fun prepare() {
        storage = utils.getStorage()
    }

    @Test
    fun `creates database and gets values`() = runTest {
        val data = storage.getValues(listOf("test"))
        assertEquals(1, data.size)
    }
}
