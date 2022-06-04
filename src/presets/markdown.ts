import type { Preset } from ".";

const preset: Preset = {
  matcher: /.md$/,
  settings: {
    "[markdown]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true,
    },
  },
};

export default preset;
