package tests

import kotlinx.coroutines.test.runTest
import org.asyncstorage.shared_storage.Entry
import org.asyncstorage.shared_storage.SharedStorage
import kotlin.test.AfterTest
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

    @AfterTest
    fun cleanup() {
        utils.cleanup()
    }

    @Test
    fun `creates database and does basic crud operation`() = runTest {
        var data = storage.getValues(listOf("key1", "key2"))
        assertEquals(0, data.size)

        val result = storage.setValues(listOf(Entry("key1", "value1"), Entry("key2", "value2")))
        assertEquals(2, result.size)

        storage.removeValues(listOf("key2"))
        data = storage.getValues(listOf("key1", "key2"))
        assertEquals(1, data.size)
        assertEquals("key1", data.first().key)
    }
}
