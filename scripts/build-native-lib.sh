#!/bin/sh


MODULE_NAME="shared-storage"
RN_MODULE_DIR="packages/async-storage"

ANDROID_BUILD_TASK="bundleAndroidMainAar"
ANDROID_OUTPUT_NAME="local_repo" # Maven local repo
ANDROID_OUTPUT_DIR="$MODULE_NAME/build"
ANDROID_RN_OUTPUT_DIR="$RN_MODULE_DIR/android"
ANDROID_PUBLISH_TASK="publishAndroidPublicationToLocalRepoRepository"

IOS_BUILD_TASK="assembleSharedStorageXCFramework"
IOS_OUTPUT_NAME="SharedStorage.xcframework"
IOS_OUTPUT_DIR="$MODULE_NAME/build/XCFrameworks/release"
IOS_RN_OUTPUT_DIR="$RN_MODULE_DIR/ios/Frameworks"



build_android() {
  echo "👷 Assembling android shared-storage"
  ./gradlew :$MODULE_NAME:$ANDROID_BUILD_TASK

  echo "Publishing binaries to local repo"
  ./gradlew :$MODULE_NAME:$ANDROID_PUBLISH_TASK

  echo "Remove old local repo"
  rm -rf $ANDROID_RN_OUTPUT_DIR/$ANDROID_OUTPUT_NAME

  echo "Moving local repo to RN target"
  mv $ANDROID_OUTPUT_DIR/$ANDROID_OUTPUT_NAME $ANDROID_RN_OUTPUT_DIR/$ANDROID_OUTPUT_NAME
  echo "all done"
}

build_ios() {
  echo "👷 Assembling ios shared-storage"
  ./gradlew :$MODULE_NAME:$IOS_BUILD_TASK


  echo "recreate Frameworks dir"
  rm -rf $IOS_RN_OUTPUT_DIR
  mkdir $IOS_RN_OUTPUT_DIR

  echo "move xcframework to RN module"
  mv $IOS_OUTPUT_DIR/$IOS_OUTPUT_NAME $IOS_RN_OUTPUT_DIR/$IOS_OUTPUT_NAME
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

