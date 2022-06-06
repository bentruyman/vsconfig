import type { Preset } from ".";

const preset: Preset = {
  description: "TypeScript (React)",
  matcher: /.tsx$/,
  settings: {
    "[typescriptreact]": {
      "editor.defaultFormatter": "dbaeumer.vscode-eslint",
      "editor.formatOnSave": true,
    },
  },
};

export default preset;
