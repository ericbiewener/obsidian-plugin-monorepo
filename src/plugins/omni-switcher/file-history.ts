import * as o from "obsidian";
import OmniSwitcherPlugin from ".";
import { onceOnFileOpen } from "../../utils/obsidian/workspace/once-on-file-open";

/**
 * Delete files from history that no longer exist in the vault
 */
export const cleanupFileHistory = (plugin: OmniSwitcherPlugin) => {
	const { app, data } = plugin;
	onceOnFileOpen(app, () => {
		const files = app.vault.getMarkdownFiles();
		data.fileHistory = data.fileHistory.filter((f) =>
			files.some((file) => f === file.path),
		);
		plugin.saveData(data);
	});
};

export const updateFileHistory = (plugin: OmniSwitcherPlugin) => {
	const { data, app } = plugin;
	app.workspace.on("file-open", async (file: o.TFile) => {
		data.fileHistory = data.fileHistory.filter((f) => f !== file.path);
		data.fileHistory.unshift(file.path);
		await plugin.saveData(data);
	});
};
