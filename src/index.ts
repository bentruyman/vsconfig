import merge from "lodash.merge";
import { presets } from "./presets";
import type { VsConfig } from "./types";

interface CreateConfigOptions {
  presets: string[];
}

export function createConfig(options: CreateConfigOptions): VsConfig {
  const config: VsConfig = { folders: [{ path: "." }] };

  options.presets.forEach((name) => {
    const preset = presets.get(name);

    if (preset !== undefined) {
      config.settings = merge(config.settings, preset.settings);
    }
  });

  return config;
}
