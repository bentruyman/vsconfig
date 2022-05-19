import type { Preset } from "./presets";

interface Folder {
  name?: string;
  path: string;
}

export interface VsConfig {
  folders: Folder[];
  settings?: Preset["settings"];
}
