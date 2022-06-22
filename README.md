# vsconfig

Generates VSCode workspace configs based on your project's needs.

## Installation

Install `vsconfig` globally:

```console
$ npm i -g vsconfig
```

## Usage

Generate a new workspace config (e.g. `[project].code-workspace` and follow the
prompts:

```
$ vsconfig
```

Generate a new workspace config based on existing files found in a project:

```
$ vsconfig --scan
```

Generate the recommended extensions config (e.g. `.vscode/extensions.json`):

```
$ vsconfig --extensions
```

### API

#### Create a new config from a list of presets

```typescript
import { createConfig } from "vsconfig";
import { presets } from "vsconfig/presets";

const config = createConfig({ presets });

console.log("VSCode Config:", config.settings);
```

#### Create a list of presets by scanning a project

```typescript
import { scan } from "vsconfig";
import { presets } from "vsconfig/presets";

const foundPresets = await scan({
  dir: process.cwd(),
  presets,
});

console.log("Found presets:", foundPresets);
```

## Supported

- Deno
- JSON
- JSX
- JavaScript
- Markdown
- TSX
- TypeScript
- YAML

## License

[MIT](https://choosealicense.com/licenses/mit/)
