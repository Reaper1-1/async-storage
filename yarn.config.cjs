const workspaceDependencies = {
  eslint: "8.54.0",
  prettier: "2.8.8",
  typescript: "5.9.2",
};

// noinspection JSUnusedGlobalSymbols
module.exports = {
  async constraints({ Yarn }) {
    Object.keys(workspaceDependencies).forEach((dependency) => {
      const version = workspaceDependencies[dependency];
      for (const dep of Yarn.dependencies({ ident: dependency })) {
        if (dep.type === "devDependencies") {
          dep.update(version);
        }
      }
    });
  },
};
