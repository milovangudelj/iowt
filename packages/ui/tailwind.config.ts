// tailwind config is required for editor support
import type { Config } from "tailwindcss";
import sharedConfig from "iowt-tailwind-config/tailwind.config";

const config: Pick<Config, "prefix" | "presets"> = {
  prefix: "ui-",
  presets: [sharedConfig],
};

export default config;
