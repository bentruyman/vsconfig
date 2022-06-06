import type { Preset } from ".";

const preset: Preset = {
  description: "YAML",
  matcher: /.ya?ml$/,
  settings: {
    "[yaml]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true,
    },
  },
};

export default preset;
