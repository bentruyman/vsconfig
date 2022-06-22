import merge from "lodash.merge";

import type { PresetMap } from "./presets";
import type { VsConfig } from "./types";

export interface ConfigContext {
  presets: PresetMap;
}

export function createConfig({ presets }: ConfigContext): VsConfig {
  const config: VsConfig = { folders: [{ path: "." }] };

  presets.forEach((preset) => {
    config.settings = merge(config.settings, preset.settings);
  });

  return config;
}
