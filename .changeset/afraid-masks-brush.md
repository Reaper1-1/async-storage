---
"@react-native-async-storage/async-storage": major
---

Async Storage v3

## General changes
- Async Storage now provides a way to create isolated data storages, so your data does is not stored in "one bucket"
- Default export is now a proxy to the legacy v2 implementation for gradual migration
- You must now create storages using `createAsyncStorage(name)` — no default global storage instance
- New website

## Breaking Changes:

- Android requires a `repositories.maven` added in project's `build.gradle`
- You must now create storages using `createAsyncStorage(name)` — no default global storage instance.
- `multiGet`, `multiSet`, and `multiRemove` renamed to `getMany`, `setMany`, and `removeMany`
- The "multi" methods now accept object maps ({ key: value }) instead of arrays of pairs ([[key, value]])
- `mergeItem` and `multiMerge` have been removed
- `useAsyncStorage` hook has been removed
- Methods now throw `AsyncStorageError` instead of using callbacks for error handling.
- New Brownfield access (replaced delegate on iOS) for native platforms
- iCloud backup exclusion flag removed (storage is excluded by default).
- Web backend switched to IndexedDB

