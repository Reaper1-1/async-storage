const workspaceDependencies = {
  eslint: "9.34.0",
  prettier: "2.8.8",
  typescript: "5.9.2",
};

// noinspection JSUnusedGlobalSymbols
module.exports = {
  async constraints({ Yarn }) {
    Object.keys(workspaceDependencies).forEach((dependency) => {
      const version = workspaceDependencies[dependency];
      for (const dep of Yarn.dependencies({ ident: dependency })) {
        dep.update(version);
      }
    });
  },
};
