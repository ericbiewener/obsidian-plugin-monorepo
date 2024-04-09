import * as o from "obsidian";

export const waitForPluginInit = <P extends o.Plugin>(
	app: o.App,
	name: string,
) =>
	new Promise<P>((res) => {
		const interval = setInterval(() => {
			const plugin = app.plugins.plugins[name];
			if (!plugin) return;
			clearInterval(interval);
			res(plugin as P);
		});
	});
