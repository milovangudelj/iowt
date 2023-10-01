import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  banner: {
    js: `"use client"`,
  },
  treeshake: true,
  splitting: true,
  entry: ["src/components/**/*.tsx"],
  format: ["esm"],
  dts: true,
  minify: true,
  clean: true,
  external: ["react"],
  ...options,
}));
