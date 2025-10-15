# Contributing to React Native Async Storage

Thank you for helping out with Async Storage! We'd like to make contributions as
pleasant as possible, so here's a small guide of how we see it. Happy to hear
your feedback about anything, so please let us know.

## Tests

We use TypeScript for type check, `eslint` with `prettier` for
linting/formatting. All tests are run on Github Actions for all opened pull requests, but you should use them locally when
making changes.

- `yarn test:lint`: Run `eslint` check.
- `yarn test:ts`: Run `tsc` type check.
- `yarn test:format`: Run `prettier` check for formatting mistakes.


You can also run unit tests for `shared-storage`, using one of gradle task:

- `./gradlew testAndroidHostTest`
- `./gradlew macosArm64Test`
- `./gradlew iosSimulatorArm64Test`

## Sending a pull request

When you're sending a pull request:

- Communication is a key. If you want fix/add something, please open new/find
  existing issue, so we can discuss it.
- We prefer small pull requests focused on one change, as those are easier to
  test/check.
- Please make sure that all tests are passing on your local machine.
- Please make sure you've run formatters and linters locally.
  - In VS Code, you can press ⇧+Alt+F or ⇧⌥F to format the current file.
    - To format C++ and Objective-C files, make sure you have the
      [C/C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
      installed.
    - To format JavaScript files, please install
      [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
  - From the command line, you can run `yarn format:c` and `yarn format:js` to
    format C-based languages and JavaScript respectively. The first command
    requires that you've already installed
    [ClangFormat](https://clang.llvm.org/docs/ClangFormat.html).
- Follow the template when opening a PR.

## Commits and versioning

All PRs are squashed into `main` branch and wrapped up in a single commit,
following
[conventional commit message](https://www.conventionalcommits.org/en/v1.0.0-beta.3).
Combined with [semantic versioning](https://semver.org/), this allows us to have
a frequent releases of the library.

_Note_: We don't force this convention on Pull Requests from contributors, but
it's a clean way to see what type of changes are made, so feel free to follow
it.

Most notably prefixes you'll see:

- **fix**: Bug fixes, triggers _patch_ release
- **feat**: New feature implemented, triggers _minor_
- **chore**: Changes that are not affecting end user (CI config changes,
  scripts, ["grunt work"](https://stackoverflow.com/a/26944812/3510245))
- **docs**: Documentation changes.
- **perf**: A code change that improves performance.
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **test**: Adding missing tests or correcting existing tests.

## Release process

We use [Changeset](https://github.com/changesets/changesets) to manage releases. 
In your PR, run `yarn changeset` to create a new changeset, describing your changes.
The Changeset Bot will help you out during opening a PR.

## Reporting issues

You can report issues on our
[bug tracker](https://github.com/react-native-async-storage/async-storage/issues).
Please search for existing issues and follow the issue template when opening a one.

## License

By contributing to React Native Async Storage, you agree that your contributions
will be licensed under the **MIT** license.
