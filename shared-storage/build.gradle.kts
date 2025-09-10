plugins {
  alias(libs.plugins.kotlinMultiplatform)
  alias(libs.plugins.androidKotlinMultiplatformLibrary)
}

kotlin {
  androidLibrary {
    namespace = "org.asyncstorage.shared_storage"
    compileSdk = 36
    minSdk = 24

    withHostTestBuilder {}

    withDeviceTestBuilder { sourceSetTreeName = "test" }
        .configure { instrumentationRunner = "androidx.test.runner.AndroidJUnitRunner" }
  }

  val xcfName = "SharedStorage"
  listOf(iosX64(), iosArm64(), iosSimulatorArm64()).forEach {
    it.binaries.framework { baseName = xcfName }
  }

  jvm()

  sourceSets {
    commonMain { dependencies {} }

    androidMain { dependencies {} }

    iosMain { dependencies {} }

    jvmMain { dependencies {} }

    commonTest { dependencies { implementation(libs.kotlin.test) } }

    getByName("androidDeviceTest") {
      dependencies {
        implementation(libs.androidx.runner)
        implementation(libs.androidx.core)
        implementation(libs.androidx.testExt.junit)
      }
    }
  }
}
