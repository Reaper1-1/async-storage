#!/bin/sh


MODULE_NAME="shared-storage"
RN_MODULE_DIR="packages/async-storage"

ANDROID_BUILD_TASK="bundleAndroidMainAar"
ANDROID_OUTPUT_NAME="local_repo" # Maven local repo
ANDROID_OUTPUT_DIR="$MODULE_NAME/build"
ANDROID_RN_OUTPUT_DIR="$RN_MODULE_DIR/android"
ANDROID_PUBLISH_TASK="publishAndroidPublicationToLocalRepoRepository"

APPLE_BUILD_TASK="assembleSharedAsyncStorageXCFramework"
APPLE_OUTPUT_NAME="SharedAsyncStorage.xcframework"
APPLE_OUTPUT_DIR="$MODULE_NAME/build/XCFrameworks/release"
APPLE_RN_OUTPUT_DIR="$RN_MODULE_DIR/apple/Frameworks"



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

build_apple() {
  echo "👷 Assembling apple shared-storage"
  ./gradlew :$MODULE_NAME:$APPLE_BUILD_TASK


  echo "recreate Frameworks dir"
  rm -rf $APPLE_RN_OUTPUT_DIR
  mkdir $APPLE_RN_OUTPUT_DIR

  echo "move xcframework to RN module"
  mv $APPLE_OUTPUT_DIR/$APPLE_OUTPUT_NAME $APPLE_RN_OUTPUT_DIR/$APPLE_OUTPUT_NAME
  echo "all done"
}

TARGET=$1

case "$TARGET" in
  android)
    build_android
    ;;
  apple)
    build_apple
    ;;
  all)
    build_all
    ;;
  *)
    echo "Usage: $0 {android|apple}"
    exit 1
    ;;
esac

