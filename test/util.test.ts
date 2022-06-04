import { findMatchingPresets } from "../src/util";

describe("findMatchingPreset", () => {
  it("matches a filename to one or more presets", () => {
    const presetMap = new Map([
      [
        "test",
        {
          matcher: /\/test\//,
          settings: {
            test: true,
          },
        },
      ],
      [
        "ts",
        {
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
