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

```typescript
import { createConfig } from "vsconfig";

const config = createConfig(["json", "markdown", "typescript"]);

console.log("Settings:", config.settings);
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
