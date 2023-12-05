import * as o from "obsidian";
import { paramCase } from "param-case";

type Opts = Omit<o.Command, "id" | "name" | "callback">;

export const addCommand =
  (name: string, cb: (plugin: o.Plugin) => any, opts?: Opts) =>
  (plugin: o.Plugin) =>
    plugin.addCommand({
      name,
      id: paramCase(name),
      callback: () => cb(plugin),
      ...opts,
    });
