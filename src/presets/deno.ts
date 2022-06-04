import type { Preset } from ".";

const preset: Preset = {
  matcher: /^deps.ts$/,
  settings: {
    "deno.enable": true,
  },
};

export default preset;
