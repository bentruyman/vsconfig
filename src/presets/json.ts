import type { Preset } from ".";

const preset: Preset = {
  description: "JSON",
  matcher: /.json$/,
  settings: {
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true,
    },
  },
};

export default preset;
