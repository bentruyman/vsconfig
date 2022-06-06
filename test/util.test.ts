import type { PresetMap } from "../src/presets";
import { createConfigFilename, findMatchingPresets } from "../src/util";

describe("createConfigFilename", () => {
  it("generates a config filename based on the current working directory", () => {
    expect(createConfigFilename("/foo/bar")).toEqual(
      "/foo/bar/bar.code-workspace"
    );
    expect(createConfigFilename("/foo/bar/baz")).toEqual(
      "/foo/bar/baz/baz.code-workspace"
    );
  });
});

describe("findMatchingPreset", () => {
  it("matches a filename to one or more presets", () => {
    const presetMap: PresetMap = new Map([
      [
        "test",
        {
          description: "test",
          matcher: /\/test\//,
          settings: {
            test: true,
          },
        },
      ],
      [
        "ts",
        {
          description: "typescript",
          matcher: /\.ts$/,
          settings: {
            typescript: true,
          },
        },
      ],
    ]);

    expect(findMatchingPresets("/test.ts", presetMap)).toEqual(["ts"]);
    expect(findMatchingPresets("/dir/test.ts", presetMap)).toEqual(["ts"]);
    expect(findMatchingPresets("/test/file.txt", presetMap)).toEqual(["test"]);
    expect(findMatchingPresets("/test/test.ts", presetMap)).toEqual([
      "test",
      "ts",
    ]);
  });
});
