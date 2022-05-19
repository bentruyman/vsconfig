import { createConfig } from "../src";

describe("createConfig", () => {
  it("creates a new config using the current folder as the project root by default", () => {
    const config = createConfig({
      presets: ["json", "markdown", "typescript"],
    });

    expect(config.folders[0]).toEqual({ path: "." });
  });

  it("creates a new config based on a collection of specified presets", () => {
    const config = createConfig({
      presets: ["json", "markdown", "typescript"],
    });

    expect(Object.keys(config.settings)).toHaveLength(3);
    expect(config.settings["[json]"]).toBeDefined();
    expect(config.settings["[markdown]"]).toBeDefined();
    expect(config.settings["[typescript]"]).toBeDefined();
    expect(config).toMatchSnapshot();
  });
});
