import * as o from "obsidian";
import { onceOnFileOpen } from "../../../utils/obsidian/workspace/once-on-file-open";
import OmniSwitcherPlugin from "../index";

export const updateCmdHistory = async (
	plugin: OmniSwitcherPlugin,
	{ id }: o.Command,
) => {
	const { data } = plugin;
	data.cmdHistory = data.cmdHistory.filter((c) => c !== id);
	data.cmdHistory.unshift(id);
	await plugin.saveData(data);
};

/**
 * Delete commands from history that no longer exist
 */
export const cleanupCmdHistory = (plugin: OmniSwitcherPlugin) => {
	const { app, data } = plugin;
	// Do this on `fileOpen` to ensure vault is fully loaded
	onceOnFileOpen(app, () => {
		const cmds = app.commands.commands;
		data.cmdHistory = data.cmdHistory.filter((id) => cmds[id]);
		plugin.saveData(data);
	});
};
