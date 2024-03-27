import * as o from "obsidian";
import BetterCommandPalettePlugin from "../../plugins/better-command-palette";
import BetterFileSwitcherPlugin from "../../plugins/better-file-switcher";
import UtilsPlugin from "../../plugins/utils";

type GetPlugin = {
	(app: o.App, pluginId: "utils"): UtilsPlugin;
	(app: o.App, pluginId: "better-file-switcher"): BetterFileSwitcherPlugin;
	(app: o.App, pluginId: "better-command-palette"): BetterCommandPalettePlugin;
};

export const getPlugin: GetPlugin = (app, pluginId) =>
	app.plugins.plugins[pluginId] as any;

export const getUtils = (app: o.App) => getPlugin(app, "utils");
