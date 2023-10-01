import * as esbuild from "esbuild";
import postCssPlugin from "esbuild-style-plugin";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

const config: esbuild.BuildOptions = {
  treeShaking: true,
  splitting: true,
  // bundle: true,
  minify: true,
  entryPoints: ["src/components/**/*.tsx"],
  // external: ["react", "next", "@phosphor-icons/react", "icons"],
  outdir: "dist",
  outExtension: { ".js": ".mjs" },
  format: "esm",
  plugins: [
    postCssPlugin({
      postcss: {
        plugins: [tailwind, autoprefixer],
      },
    }),
  ],
};

export const ctx: esbuild.BuildContext = await esbuild.context(config);
export const build = async () => await esbuild.build(config);
