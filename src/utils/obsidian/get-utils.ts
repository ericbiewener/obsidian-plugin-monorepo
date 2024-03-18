import * as o from "obsidian";
import UtilsPlugin from "../../plugins/utils";

export const getUtils = (app: o.App) =>
	app.plugins.plugins.utils as UtilsPlugin;
