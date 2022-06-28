import { join } from "path";
import { scan } from "../src";
import type { PresetMap } from "../src/presets";

function getFixturePresets(): PresetMap {
  return new Map([
    [
      "js",
      {
        description: "JavaScript",
        matcher: /\.js/,
        settings: { js: true },
      },
    ],
    [
      "md",
      {
        description: "Markdown",
        matcher: /\.md/,
        settings: { md: true },
      },
    ],
    [
      "ts",
      {
        description: "TypeScript",
        matcher: /\.ts/,
        settings: { ts: true },
      },
    ],
  ]);
}

describe("scan", () => {
  it("creates a list of presets based on preset matchers and found files", async () => {
    const dir = join(__dirname, "./fixtures/basic");
    const presets = getFixturePresets();
    const found = await scan({ dir, presets });

    expect(found).toHaveLength(2);
    expect(found).toContain("md");
    expect(found).toContain("ts");
  });

  it("excludes results based on exclusion patterns", async () => {
    const dir = join(__dirname, "./fixtures/excludes");
    const exclude = ["bar"];
    const presets = getFixturePresets();
    const found = await scan({ dir, exclude, presets });

    expect(found).toHaveLength(2);
    expect(found).toContain("js");
    expect(found).toContain("ts");
  });
});
