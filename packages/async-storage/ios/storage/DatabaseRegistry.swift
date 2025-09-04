/**
 * A registry for managing multiple AsyncStorage database instances.
 * Provides a shared singleton to get instance of AsyncStorage by name.
 */
class DatabaseRegistry {
    private init() {}
    
    static let shared = DatabaseRegistry()
    
    private var databases: [String: Storage] = [:]
    
    func getOrCreate(dbName: String) -> Storage {
        if let storage = databases[dbName] {
            return storage
        }
        
        // TODO: db create
        databases[dbName] = dbName
        return dbName
    }
}

// TODO: Storage impl
typealias Storage = String
