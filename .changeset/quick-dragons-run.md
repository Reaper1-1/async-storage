---
"@react-native-async-storage/async-storage": major
---

Initial release of upcoming version v3.
Please visit [Async Storage docs to learn more](https://react-native-async-storage.github.io/)

## Breaking changes:

- Async Storage uses "scoped storages", where you need to create a storage instance before using it
- Default export is a singleton storage that uses v2/v1 storage, for easier transition
- An extra installation step is required for android
- `callback` based API is dropped
- Methods for batch operations (formerly `multi*` methods) have been renamed and their API updated
- `useAsyncStorage` hook has been removed (will be introduced later)
- Updated Native side (Brownfield) access to storage - dropped apple's delegate
- Dropped a flag to opt out from iCloud backup - disabled by default now
