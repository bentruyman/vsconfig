import cac from "cac";
import { writeFile } from "fs/promises";
import inquirer from "inquirer";
import { createConfig, scan } from ".";

import { presets } from "./presets";
import { createConfigFilename } from "./util";

interface CliArgs {
  exclude: string | string[];
  scan: boolean;
}

interface Answers {
  presets: string[];
}

const EXCLUDE_BASE = [".git", "node_modules"];

const cli = cac();

cli
  .command("[dir]", "Generate a new VSCode workspace configuration")
  .option(
    "-e, --exclude <...pattern>",
    "Exclude files during scan (only used with --scan)",
    { default: EXCLUDE_BASE }
  )
  .option(
    "--scan",
    "Scan the current project to generate a list of recommended presets",
    { default: false }
  )
  .action(
    async (dir = process.cwd(), { exclude, scan: shouldScan }: CliArgs) => {
      const initialPresets: string[] = [];

      exclude = Array.isArray(exclude) ? exclude : [exclude];
      exclude = Array.from(new Set([...EXCLUDE_BASE, ...exclude]));

      if (shouldScan) {
        initialPresets.push(...(await scan({ dir, exclude, presets })));
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
        .then(async (answers: Answers) => {
          if (answers.presets) {
            const config = createConfig({ presets });
            const stringifiedConfig = JSON.stringify(config, null, "  ");
            const outputFile = createConfigFilename(dir);

            return writeFile(outputFile, stringifiedConfig);
          }
        });
    }
  );

cli.help();
cli.parse();
