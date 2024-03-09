import * as o from "obsidian";
import OmniSwitcherPlugin from ".";
import { updateCmdHistory } from "./data/cmd-history";

export const executeAndSaveCmd = async (
	plugin: OmniSwitcherPlugin,
	cmd: o.Command,
) => {
	const { app, data } = plugin;
	app.commands.executeCommandById(cmd.id);
	await updateCmdHistory(plugin, cmd);
};
