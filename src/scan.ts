import klaw from "klaw";

import { relative } from "path";

import type { ConfigContext } from "./createConfig";
import { findMatchingPresets } from "./util";

export function scan(
  dir: string,
  { presets }: ConfigContext
): Promise<string[]> {
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
