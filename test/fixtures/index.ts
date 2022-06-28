import type { PresetMap } from "../../src/presets";

export function getFixturePresets(): PresetMap {
  return new Map([
    [
      "foo",
      {
        description: "foo description",
        matcher: /foo/,
        settings: { foo: true },
      },
    ],
    [
      "bar",
      {
        description: "bar description",
        matcher: /bar/,
        settings: { bar: false },
      },
    ],
  ]);
}
