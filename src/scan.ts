import klaw from "klaw";

import { relative } from "path";

import type { PresetMap } from "./presets";
import { findMatchingPresets } from "./util";

interface ScanOptions {
  dir: string;
  presets: PresetMap;
}

export function scan({ dir, presets }: ScanOptions): Promise<string[]> {
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
