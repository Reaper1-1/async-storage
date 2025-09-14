@objc
public class StorageRegistry: NSObject {
    override private init() {
        super.init()
    }

    @objc
    public static let shared = StorageRegistry()

    private var databases: [String: PersistentStorage] = [:]

    @objc
    public func getOrCreate(dbName: String) -> PersistentStorage {
        if let storage = databases[dbName] {
            return storage
        }

        let db = PersistentStorage(databaseName: dbName)
        databases[dbName] = db
        return db
    }
}
