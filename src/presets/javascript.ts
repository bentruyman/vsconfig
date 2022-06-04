import type { Preset } from ".";

const preset: Preset = {
  matcher: /.js$/,
  settings: {
    "[javascript]": {
      "editor.defaultFormatter": "dbaeumer.vscode-eslint",
      "editor.formatOnSave": true,
    },
  },
};

export default preset;
