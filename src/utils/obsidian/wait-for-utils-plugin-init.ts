import * as o from "obsidian";
import UtilsPlugin from "../../plugins/utils";
import { waitForPluginInit } from "./wait-for-plugin-init";

export const waitForUtilsPluginInit = (app: o.App) =>
	waitForPluginInit<UtilsPlugin>(app, "utils");
