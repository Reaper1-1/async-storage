#import "AsyncStorage.h"
#import "AsyncStorage-Swift.h"

@implementation AsyncStorage
RCT_EXPORT_MODULE(RNAsyncStorage)

- (void)getValues:(nonnull NSString *)dbName keys:(nonnull NSArray *)keys resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    
    PersistentStorage* db = [StorageRegistry.shared getOrCreateWithDbName:dbName];
    [db getWithKeys:keys resolver:resolve rejecter:reject];
}

- (void)setValues:(nonnull NSString *)dbName values:(nonnull NSArray<NSDictionary *> *)values resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    
    PersistentStorage* db = [StorageRegistry.shared getOrCreateWithDbName:dbName];
    [db setWithValues:values resolver:resolve rejecter:reject];
}


- (void)removeValues:(nonnull NSString *)dbName keys:(nonnull NSArray *)keys resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    
    PersistentStorage* db = [StorageRegistry.shared getOrCreateWithDbName:dbName];
    [db removeWithKeys:keys resolver:resolve rejecter:reject];
}


- (void)clearStorage:(nonnull NSString *)dbName resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    
    PersistentStorage* db = [StorageRegistry.shared getOrCreateWithDbName:dbName];
    [db clearWithResolver:resolve rejecter:reject];
}

- (void)getKeys:(nonnull NSString *)dbName resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    
    PersistentStorage* db = [StorageRegistry.shared getOrCreateWithDbName:dbName];
    [db allKeysWithResolver:resolve rejecter:reject];
}


#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeAsyncStorageSpecJSI>(params);
}
#endif


@end
