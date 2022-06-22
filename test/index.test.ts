import { join } from "path";
import { createConfig, scan } from "../src";
import type { PresetMap } from "../src/presets";

const presets: PresetMap = new Map([
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

describe("createConfig", () => {
  it("creates a new config based on a collection of specified presets", () => {
    const config = createConfig({ presets });

    expect(config.folders[0]).toEqual({ path: "." });
    expect(config.settings.foo).toBe(true);
    expect(config.settings.bar).toBe(false);
  });
});

describe("scan", () => {
  it("creates a list of presets based on preset matchers and found files", async () => {
    const dir = join(__dirname, "./fixtures/basic");
    const found = await scan(dir, { presets });

    expect(found).toContain("foo");
  });
});
