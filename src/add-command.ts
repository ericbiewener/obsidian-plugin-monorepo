import { kebabCase } from "case-anything";
import * as o from "obsidian";

type Opts = Omit<o.Command, "id" | "name" | "callback">;

export const addCommand =
	<P extends o.Plugin>(name: string, cb: (plugin: P) => unknown, opts?: Opts) =>
	(plugin: P) =>
		plugin.addCommand({
			name,
			id: kebabCase(name),
			callback: () => cb(plugin),
			...opts,
		});
