// tailwind config is required for editor support
import type { Config } from "tailwindcss";
import sharedConfig from "iowt-tailwind-config/tailwind.config";

const config: Config = {
  prefix: "ui-",
  content: ["./src/components/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;
