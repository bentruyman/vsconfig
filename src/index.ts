import { relative } from "path";

import klaw from "klaw";
import merge from "lodash.merge";

import { presets } from "./presets";
import type { VsConfig } from "./types";
import { findMatchingPresets } from "./util";

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

export function scan(dir: string): Promise<string[]> {
  return new Promise((resolve) => {
    const foundPresets: Set<string> = new Set();

    klaw(dir)
      .on("data", (item) => {
        const rootRelativeFilename = relative(dir, item.path);

        findMatchingPresets(rootRelativeFilename, presets).forEach((key) =>
          foundPresets.add(key)
        );
      })
      .on("end", () => {
        resolve(Array.from(foundPresets));
      });
  });
}
