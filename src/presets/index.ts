import deno from "./deno";
import javascript from "./javascript";
import javascriptreact from "./javascriptreact";
import json from "./json";
import markdown from "./markdown";
import typescript from "./typescript";
import typescriptreact from "./typescriptreact";
import yaml from "./yaml";

export interface Preset {
  settings: any;
}

export const presets: Map<string, Preset> = new Map([
  ["deno", deno],
  ["javascript", javascript],
  ["javascriptreact", javascriptreact],
  ["json", json],
  ["markdown", markdown],
  ["typescript", typescript],
  ["typescriptreact", typescriptreact],
  ["yaml", yaml],
]);
