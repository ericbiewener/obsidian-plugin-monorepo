import * as o from "obsidian";

export const initPluginData = async <D extends Record<string, unknown>>(
	plugin: o.Plugin & { data: D },
) => {
	Object.assign(plugin.data, await plugin.loadData());
};
