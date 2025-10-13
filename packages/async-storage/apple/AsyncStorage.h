#import <AsyncStorageSpec/AsyncStorageSpec.h>

#import <React/RCTBridgeModule.h>

@interface AsyncStorage : NSObject <
#ifdef RCT_NEW_ARCH_ENABLED
                              NativeAsyncStorageSpec
#else
                              RCTBridgeModule
#endif
                              >

@end
