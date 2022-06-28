import merge from "lodash.merge";
import type { PresetMap } from "./presets";

interface Folder {
  name?: string;
  path: string;
}
export type Settings = Record<string, unknown>;

export interface VsConfig {
  folders: Folder[];
  settings?: Settings;
}

export interface ConfigContext {
  presets: PresetMap;
}

export function createConfig(ctx: ConfigContext): VsConfig {
  const config: VsConfig = { folders: [{ path: "." }] };

  ctx.presets.forEach((preset) => {
    const presetSettings =
      typeof preset.settings === "function"
        ? preset.settings(ctx)
        : preset.settings;

    config.settings = merge(config.settings, presetSettings);
  });

  return config;
}
