import * as o from "obsidian";

export const onPluginInit = <P extends o.Plugin>(
	app: o.App,
	name: string,
	cb: (plugin: P) => void,
) => {
	const interval = setInterval(() => {
		const plugin = app.plugins.plugins[name];
		if (!plugin) return;
		clearInterval(interval);
		cb(plugin as P);
	});
};
