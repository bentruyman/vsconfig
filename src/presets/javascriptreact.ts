import type { Preset } from ".";

const preset: Preset = {
  description: "JavaScript (React)",
  matcher: /.jsx$/,
  settings: {
    "[javascriptreact]": {
      "editor.defaultFormatter": "dbaeumer.vscode-eslint",
      "editor.formatOnSave": true,
    },
  },
};

export default preset;
