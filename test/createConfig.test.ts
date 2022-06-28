import { createConfig } from "../src";
import { getFixturePresets } from "./fixtures";

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
