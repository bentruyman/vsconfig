import { join } from "path";
import { scan } from "../src";
import { getFixturePresets } from "./fixtures";

describe("scan", () => {
  it("creates a list of presets based on preset matchers and found files", async () => {
    const dir = join(__dirname, "./fixtures/basic");
    const presets = getFixturePresets();
    const found = await scan({ dir, presets });

    expect(found).toContain("foo");
  });
});
