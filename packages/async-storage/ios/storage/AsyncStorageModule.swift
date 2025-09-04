import React

@objc
public class AsyncStorageModule: NSObject
{
    @objc
    public func get(
        keys: [String],
        dbName: String,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    )
    {
        // TODO: call db, get results, call resolve/reject
        _ = DatabaseRegistry.shared.getOrCreate(dbName: dbName)
        rejecter("ERR_01", "get not implemented", nil)
        
    }

    @objc
    public func set(
        entries: [[String: String]],
        dbName: String,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    )
    {
        // TODO: call db, save results, call resolve/reject
        _ = DatabaseRegistry.shared.getOrCreate(dbName: dbName)
        rejecter("ERR_01", "set not implemented", nil)
    }

    @objc
    public func remove(
        keys: [String],
        dbName: String,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    )
    {
        // TODO: call db, remove entries, call resolve/reject
        _ = DatabaseRegistry.shared.getOrCreate(dbName: dbName)
        rejecter("ERR_01", "remove not implemented", nil)
    }

    @objc
    public func clear(
        dbName: String,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    )
    {
        // TODO: get db, clear, call resolve/reject
        _ = DatabaseRegistry.shared.getOrCreate(dbName: dbName)
        rejecter("ERR_01", "clear not implemented", nil)
    }

    @objc
    public func allKeys(
        dbName: String,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    )
    {
        // TODO: get db, read keys, call resolve/reject
        _ = DatabaseRegistry.shared.getOrCreate(dbName: dbName)
        rejecter("ERR_01", "allKeys not implemented", nil)
    }
}
