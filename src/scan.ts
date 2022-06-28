import klaw from "klaw";
import match from "minimatch";

import { relative } from "path";

import type { PresetMap } from "./presets";
import { findMatchingPresets } from "./util";

interface ScanOptions {
  dir: string;
  exclude?: string[];
  presets: PresetMap;
}

export function scan({
  dir,
  exclude = [],
  presets,
}: ScanOptions): Promise<string[]> {
  return new Promise((resolve) => {
    const foundPresets: Set<string> = new Set();

    klaw(dir, {
      filter: (path) => {
        const rel = relative(dir, path);
        return !exclude.some((pattern) => match(rel, pattern));
      },
    })
      .on("data", (item) => {
        const rootRelativeFilename = relative(dir, item.path);

        findMatchingPresets(rootRelativeFilename, presets).forEach((key) => {
          foundPresets.add(key);
        });
      })
      .on("end", () => {
        resolve(Array.from(foundPresets));
      });
  });
}
