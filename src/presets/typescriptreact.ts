import type { Preset } from ".";

const preset: Preset = {
  matcher: /.tsx$/,
  settings: {
    "[typescriptreact]": {
      "editor.defaultFormatter": "dbaeumer.vscode-eslint",
      "editor.formatOnSave": true,
    },
  },
};

export default preset;
