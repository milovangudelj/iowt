import { defineConfig, type Options } from "tsup";

// eslint-disable-next-line import/no-default-export -- required for tsup
export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ["src/**/*.ts"],
  format: ["esm"],
  dts: true,
  minify: true,
  clean: true,
  ...options,
}));
