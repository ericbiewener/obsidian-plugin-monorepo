import * as o from "obsidian";
import UtilsPlugin from "../../plugins/utils";
import { onPluginInit } from "./on-plugin-init";

export const onUtilsPluginInit = (
	app: o.App,
	cb: (utils: UtilsPlugin) => void,
) => onPluginInit<UtilsPlugin>(app, "utils", cb);
