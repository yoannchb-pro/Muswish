const ts = require("rollup-plugin-ts");

const pkg = require("./package.json");
const config = require("./tsconfig.json");

export default {
  input: "./src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "umd",
      name: "muswish",
      sourcemap: true,
    },
  ],
  plugins: [ts(config)],
};
