import type { PresetMap } from "./presets";

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
