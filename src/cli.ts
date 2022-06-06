import cac from "cac";
import { writeFile } from "fs/promises";
import inquirer from "inquirer";
import { createConfig, scan } from ".";

import { presets } from "./presets";
import { createConfigFilename } from "./util";

const cli = cac();

cli
  .command("[dir]", "Generate a new VSCode workspace configuration")
  .option(
    "--scan",
    "Scan the current project to generate a list of recommended presets"
  )
  .action(async (dir = process.cwd(), options) => {
    const shouldScan = options.scan === true;
    const initialPresets: string[] = [];

    if (shouldScan) {
      initialPresets.push(...(await scan(dir)));
    }

    const choices = Array.from(presets.entries())
      .sort()
      .map(([name, item]) => {
        return {
          name: item.description,
          value: name,
          checked: initialPresets.includes(name),
        };
      });

    inquirer
      .prompt([
        {
          type: "checkbox",
          message: "Choose your project's presets",
          name: "presets",
          choices,
        },
      ])
      .then(async (answers) => {
        if (answers.presets) {
          const config = createConfig({ presets: answers.presets });
          const stringifiedConfig = JSON.stringify(config, null, "  ");
          const outputFile = createConfigFilename(dir);

          return writeFile(outputFile, stringifiedConfig);
        }
      });
  });

cli.help();
cli.parse();
