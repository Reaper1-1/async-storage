#!/bin/sh


MODULE_NAME="shared-storage"
RN_MODULE_DIR="packages/async-storage"

ANDROID_BUILD_TASK="bundleAndroidMainAar"
ANDROID_OUTPUT_NAME="local_repo" # Maven local repo
ANDROID_OUTPUT_DIR="$MODULE_NAME/build"
ANDROID_RN_OUTPUT_DIR="$RN_MODULE_DIR/android"
ANDROID_PUBLISH_TASK="publishAndroidPublicationToLocalRepoRepository"

IOS_BUILD_TASK="linkReleaseFrameworkIosFat"
IOS_OUTPUT_NAME="SharedStorage.framework"
IOS_OUTPUT_DSYM_NAME="$IOS_OUTPUT_NAME.dSYM"
IOS_OUTPUT_DIR="$MODULE_NAME/build/fat-framework/release"
IOS_RN_OUTPUT_DIR="$RN_MODULE_DIR/ios/Framework"



build_android() {
  echo "👷 Assembling android shared-storage"
  ./gradlew :$MODULE_NAME:$ANDROID_BUILD_TASK

  echo "Publishing binaries to local repo"
  ./gradlew :$MODULE_NAME:$ANDROID_PUBLISH_TASK

  echo "Moving local repo to RN target"
  mv $ANDROID_OUTPUT_DIR/$ANDROID_OUTPUT_NAME $ANDROID_RN_OUTPUT_DIR/$ANDROID_OUTPUT_NAME
  echo "all done"
}

build_ios() {
  echo "👷 Assembling ios shared-storage"
  ./gradlew :$MODULE_NAME:$IOS_BUILD_TASK
  echo "shared module built"
  echo "move binary and dSYM to RN module"
  mv $IOS_OUTPUT_DIR/$IOS_OUTPUT_NAME $IOS_RN_OUTPUT_DIR/$IOS_OUTPUT_NAME
  mv $IOS_OUTPUT_DIR/$IOS_OUTPUT_DSYM_NAME $IOS_RN_OUTPUT_DIR/$IOS_OUTPUT_DSYM_NAME
  echo "all done"
}

TARGET=$1

case "$TARGET" in
  android)
    build_android
    ;;
  ios)
    build_ios
    ;;
  all)
    build_all
    ;;
  *)
    echo "Usage: $0 {android|ios}"
    exit 1
    ;;
esac

