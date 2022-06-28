import { join } from "path";
import { createConfig, scan } from "../src";
import type { PresetMap } from "../src/presets";

function getFixturePresets(): PresetMap {
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

describe("createConfig", () => {
  it("creates a new config based on a collection of specified presets", () => {
    const presets = getFixturePresets();
    const config = createConfig({ presets });

    expect(config.folders[0]).toEqual({ path: "." });
    expect(config.settings!.bar).toBe(false);
  });

  it("allows preset settings to be constructed dynamically", () => {
    expect.assertions(5);

    const presets = getFixturePresets();
    presets.set("baz", {
      description: "baz description",
      matcher: /baz/,
      settings: (ctx) => {
        expect(ctx.presets.size).toBe(3);
        return { baz: "baz" };
      },
    });

    const config = createConfig({ presets });

    expect(config.folders[0]).toEqual({ path: "." });
    expect(config.settings!.foo).toBe(true);
    expect(config.settings!.bar).toBe(false);
    expect(config.settings!.baz).toBe("baz");
  });
});

describe("scan", () => {
  it("creates a list of presets based on preset matchers and found files", async () => {
    const presets = getFixturePresets();
    const dir = join(__dirname, "./fixtures/basic");
    const found = await scan(dir, { presets });

    expect(found).toContain("foo");
  });
});
