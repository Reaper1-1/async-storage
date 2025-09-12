import org.jetbrains.kotlin.gradle.dsl.JvmTarget

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

        compilations.configureEach {
            compilerOptions.configure { jvmTarget.set(JvmTarget.JVM_1_8) }
        }

        withHostTest { isIncludeAndroidResources = true }

        /**
         * For some reason, device tests needs to be set up too, in order for test runner for
         * android to work correctly. Otherwise, it fails with missing android/Application class.
         */
        withDeviceTest {}
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

        commonTest {
            dependencies {
                implementation(libs.tests.kotlin)
                implementation(libs.tests.coroutines)
                implementation(libs.tests.turbine)
            }
        }

        getByName("androidHostTest") {
            dependencies {
                implementation(libs.tests.robolectric)
                implementation(libs.tests.junit)
            }
        }

        compilerOptions { freeCompilerArgs.add("-Xexpect-actual-classes") }
    }

    dependencies {
        add("kspAndroid", libs.androidx.room.compiler)
        add("kspIosSimulatorArm64", libs.androidx.room.compiler)
        add("kspIosX64", libs.androidx.room.compiler)
        add("kspIosArm64", libs.androidx.room.compiler)
        add("kspJvm", libs.androidx.room.compiler)
    }
}
