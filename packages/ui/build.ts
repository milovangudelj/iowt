import { parseArgs } from "node:util";
import { ctx, build } from "./esbuild.config";

const args = parseArgs({
  options: {
    watch: {
      type: "boolean",
      short: "w",
    },
  },
});

if (args.values.watch) {
  console.log("Watching UI components...");
  await ctx.watch();
} else {
  console.log("Building UI components...");
  await build();
  console.log("Done.");
  process.exit(0);
}
