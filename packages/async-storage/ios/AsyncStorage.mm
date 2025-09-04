#import "AsyncStorage.h"
#import "AsyncStorage-Swift.h"

@interface AsyncStorage()
@property (nonatomic, strong) PersistentStorage *mod;
@end

@implementation AsyncStorage
RCT_EXPORT_MODULE(RNAsyncStorage)

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.mod = [PersistentStorage new];
    }
    return self;
}

- (void)getValues:(nonnull NSString *)db keys:(nonnull NSArray *)keys resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    [self.mod getWithKeys:keys dbName:db resolver:resolve rejecter:reject];
}

// JS sends  {key: string, value: string}[] type
- (void)setValues:(nonnull NSString *)db values:(nonnull NSArray<NSDictionary *> *)values resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    
    [self.mod setWithEntries:values dbName:db resolver:resolve rejecter:reject];
}


- (void)removeValues:(nonnull NSString *)db keys:(nonnull NSArray *)keys resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    [self.mod removeWithKeys:keys dbName:db resolver:resolve rejecter:reject];
}


- (void)clearStorage:(nonnull NSString *)db resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    [self.mod clearWithDbName:db resolver:resolve rejecter:reject];
}

- (void)getKeys:(nonnull NSString *)db resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    [self.mod allKeysWithDbName:db resolver:resolve rejecter:reject];
}


#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeAsyncStorageSpecJSI>(params);
}
#endif


@end
