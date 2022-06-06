import type { Preset } from ".";

const preset: Preset = {
  description: "Deno",
  matcher: /^deps.ts$/,
  settings: {
    "deno.enable": true,
  },
};

export default preset;
