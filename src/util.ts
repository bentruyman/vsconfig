import { basename, join } from "path";
import type { PresetMap } from "./presets";

const CONFIG_EXT = ".code-workspace";

export function createConfigFilename(cwd: string): string {
  return join(cwd, `${basename(cwd)}${CONFIG_EXT}`);
}

export function findMatchingPresets(
  filename: string,
  presets: PresetMap
): string[] {
  const matches: string[] = [];

  presets.forEach((value, key) => {
    if (filename.match(value.matcher)) {
      matches.push(key);
    }
  });

  return matches;
}
