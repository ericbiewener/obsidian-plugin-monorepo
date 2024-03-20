import * as o from "obsidian";
import OmniSwitcherPlugin from "../../plugins/omni-switcher";

export const getOmniSwitcher = (app: o.App) =>
	app.plugins.plugins["omni-switcher"] as OmniSwitcherPlugin;
