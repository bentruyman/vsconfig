import fs from "fs/promises";
import { join } from "path";
import { presets } from "../src/presets";

describe("smoke test", () => {
  it("contains the same number of presets as preset files", async () => {
    const presetsDir = join(__dirname, "../src/presets");

    const provided = presets.size;
    const found = (await fs.readdir(presetsDir)).length - 1;

    expect(provided).toBe(found);
  });
});
