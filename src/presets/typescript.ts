import type { Preset } from ".";

const preset: Preset = {
  description: "TypeScript",
  matcher: /.ts$/,
  settings: {
    "[typescript]": {
      "editor.defaultFormatter": "dbaeumer.vscode-eslint",
      "editor.formatOnSave": true,
    },
  },
};

export default preset;
