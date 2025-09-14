require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "AsyncStorage"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported, :osx => "12.0" }
  s.source       = { :git => "https://github.com/react-native-async-storage/async-storage.git", :tag => "#{s.version}" }
  s.resource_bundles = { "AsyncStorage_resources" => "apple/PrivacyInfo.xcprivacy" }

  s.source_files = "apple/**/*.{h,m,mm,cpp,swift}"
  s.private_header_files = "apple/**/*.h"
  s.swift_version = "5.9.2"
  s.vendored_frameworks = "apple/Frameworks/SharedAsyncStorage.xcframework"


  install_modules_dependencies(s)
end
