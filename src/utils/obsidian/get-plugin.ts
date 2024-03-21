import * as o from "obsidian";
import BetterFileSwitcherPlugin from "../../plugins/better-file-switcher";
import UtilsPlugin from "../../plugins/utils";

type GetPlugin = {
	(app: o.App, pluginId: "utils"): UtilsPlugin;
	(app: o.App, pluginId: "better-file-switcher"): BetterFileSwitcherPlugin;
};

export const getPlugin: GetPlugin = (app, pluginId) =>
	app.plugins.plugins[pluginId] as any;

export const getUtils = (app: o.App) => getPlugin(app, "utils");
