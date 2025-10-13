#import "AsyncStorage.h"

#import "AsyncStorage-Swift.h"
#import "RNCAsyncStorage.h"  // legacy storage

@implementation AsyncStorage
RCT_EXPORT_MODULE(RNAsyncStorage)

- (void)getValues:(nonnull NSString *)dbName
             keys:(nonnull NSArray *)keys
          resolve:(nonnull RCTPromiseResolveBlock)resolve
           reject:(nonnull RCTPromiseRejectBlock)reject
{

    RNStorage *db = [StorageRegistry.shared getRNStorageWithDbName:dbName];
    [db getWithKeys:keys resolver:resolve rejecter:reject];
}

- (void)setValues:(nonnull NSString *)dbName
           values:(nonnull NSArray<NSDictionary *> *)values
          resolve:(nonnull RCTPromiseResolveBlock)resolve
           reject:(nonnull RCTPromiseRejectBlock)reject
{

    RNStorage *db = [StorageRegistry.shared getRNStorageWithDbName:dbName];
    [db setWithValues:values resolver:resolve rejecter:reject];
}

- (void)removeValues:(nonnull NSString *)dbName
                keys:(nonnull NSArray *)keys
             resolve:(nonnull RCTPromiseResolveBlock)resolve
              reject:(nonnull RCTPromiseRejectBlock)reject
{

    RNStorage *db = [StorageRegistry.shared getRNStorageWithDbName:dbName];
    [db removeWithKeys:keys resolver:resolve rejecter:reject];
}

- (void)clearStorage:(nonnull NSString *)dbName
             resolve:(nonnull RCTPromiseResolveBlock)resolve
              reject:(nonnull RCTPromiseRejectBlock)reject
{

    RNStorage *db = [StorageRegistry.shared getRNStorageWithDbName:dbName];
    [db clearWithResolver:resolve rejecter:reject];
}

- (void)getKeys:(nonnull NSString *)dbName
        resolve:(nonnull RCTPromiseResolveBlock)resolve
         reject:(nonnull RCTPromiseRejectBlock)reject
{

    RNStorage *db = [StorageRegistry.shared getRNStorageWithDbName:dbName];
    [db allKeysWithResolver:resolve rejecter:reject];
}

#pragma mark - Legacy Storage

- (void)legacy_multiGet:(nonnull NSArray *)keys
                resolve:(nonnull RCTPromiseResolveBlock)resolve
                 reject:(nonnull RCTPromiseRejectBlock)reject
{
    RNCAsyncStorage *legacy = [RNCAsyncStorage sharedInstance];

    dispatch_async([legacy methodQueue], ^{
      NSError *error = nil;
      NSDictionary<NSString *, NSString *> *result = [legacy multiGet:keys error:&error];
      if (error) {
          dispatch_async(dispatch_get_main_queue(), ^{
            reject(@"AsyncStorageError", @"Failed to get values for keys", error);
          });
          return;
      }

      NSMutableArray *formatted = [NSMutableArray arrayWithCapacity:keys.count];
      for (NSString *key in keys) {
          id value = result[key];
          if (value == [NSNull null] || value == nil) {
              value = (id)kCFNull;
          }
          [formatted addObject:@[key, value]];
      }

      dispatch_async(dispatch_get_main_queue(), ^{
        resolve(formatted);
      });
    });
}

- (void)legacy_multiSet:(nonnull NSArray *)kvPairs
                resolve:(nonnull RCTPromiseResolveBlock)resolve
                 reject:(nonnull RCTPromiseRejectBlock)reject
{
    RNCAsyncStorage *legacy = [RNCAsyncStorage sharedInstance];

    dispatch_async([legacy methodQueue], ^{
      NSError *error = nil;
      BOOL success = [legacy multiSet:kvPairs error:&error];

      if (!success) {
          dispatch_async(dispatch_get_main_queue(), ^{
            reject(@"AsyncStorageError", @"Failed to set key-value pairs", error);
          });
          return;
      }

      dispatch_async(dispatch_get_main_queue(), ^{
        resolve(nil);
      });
    });
}

- (void)legacy_multiRemove:(nonnull NSArray *)keys
                   resolve:(nonnull RCTPromiseResolveBlock)resolve
                    reject:(nonnull RCTPromiseRejectBlock)reject
{
    RNCAsyncStorage *legacy = [RNCAsyncStorage sharedInstance];

    dispatch_async([legacy methodQueue], ^{
      NSError *error = nil;
      BOOL success = [legacy multiRemove:keys error:&error];

      dispatch_async(dispatch_get_main_queue(), ^{
        if (!success) {
            reject(@"AsyncStorageError", @"Failed to remove keys", error);
        } else {
            resolve(nil);
        }
      });
    });
}

- (void)legacy_getAllKeys:(nonnull RCTPromiseResolveBlock)resolve
                   reject:(nonnull RCTPromiseRejectBlock)reject
{
    RNCAsyncStorage *legacy = [RNCAsyncStorage sharedInstance];

    dispatch_async([legacy methodQueue], ^{
      NSError *error = nil;
      NSArray<NSString *> *keys = [legacy getAllKeys:&error];

      dispatch_async(dispatch_get_main_queue(), ^{
        if (!keys) {
            reject(@"AsyncStorageError", @"Failed to get all keys", error);
        } else {
            resolve(keys);
        }
      });
    });
}

- (void)legacy_clear:(nonnull RCTPromiseResolveBlock)resolve
              reject:(nonnull RCTPromiseRejectBlock)reject
{

    RNCAsyncStorage *legacy = [RNCAsyncStorage sharedInstance];

    dispatch_async([legacy methodQueue], ^{
      NSError *error = nil;
      BOOL success = [legacy clear:&error];

      dispatch_async(dispatch_get_main_queue(), ^{
        if (!success) {
            reject(@"AsyncStorageError", @"Failed to clear storage", error);
        } else {
            resolve(nil);
        }
      });
    });
}

- (void)legacy_multiMerge:(nonnull NSArray *)kvPairs
                  resolve:(nonnull RCTPromiseResolveBlock)resolve
                   reject:(nonnull RCTPromiseRejectBlock)reject
{
    // merge is removed
    resolve(nil);
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeAsyncStorageSpecJSI>(params);
}
#endif

@end
