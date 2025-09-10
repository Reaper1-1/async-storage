plugins {
  alias(libs.plugins.kotlinMultiplatform)
  alias(libs.plugins.androidKotlinMultiplatformLibrary)
  alias(libs.plugins.ksp)
  alias(libs.plugins.androidx.room)
}

kotlin {
  room { schemaDirectory("$projectDir/schemas") }

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
    commonMain {
      dependencies {
        implementation(libs.androidx.room.runtime)
        implementation(libs.androidx.sqlite.bundled)
        implementation(libs.kotlinx.coroutines)
      }
    }

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

  dependencies {
    add("kspAndroid", libs.androidx.room.compiler)
    add("kspIosSimulatorArm64", libs.androidx.room.compiler)
    add("kspIosX64", libs.androidx.room.compiler)
    add("kspIosArm64", libs.androidx.room.compiler)
    add("kspJvm", libs.androidx.room.compiler)
  }
}
