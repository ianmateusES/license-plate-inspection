module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@app": "./src/app",
          "@api": "./src/api",
          "@orm": "./src/app/typeorm",
          "@database": "./src/database",
          "@errors": "./src/errors",
          "@utils": "./src/utils",
          "@config": "./src/config"
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
};