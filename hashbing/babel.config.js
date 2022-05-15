module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      "macros",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-syntax-dynamic-import",
    ],
    presets: [
      ["@babel/preset-env", { forceAllTransforms: true }],
      "@babel/preset-flow",
    ],
  };
};
