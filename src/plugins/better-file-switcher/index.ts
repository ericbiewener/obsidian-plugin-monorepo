import * as o from "obsidian";
import { waitForUtilsPluginInit } from "../../utils/obsidian/wait-for-utils-plugin-init";
import {
	addOpenFileSuggestModalCmd,
	openFileSuggestModal,
} from "./file-switcher";

/**
 * Delete files from history that no longer exist in the vault
 */
export const cleanupFileHistory = async (plugin: BetterFileSwitcherPlugin) => {
	const { app, data } = plugin;
	const utils = await waitForUtilsPluginInit(app);
	// Do this on `fileOpen` to ensure vault is fully loaded
	utils.onceOnWorkspaceEvent(app, "file-open", () => {
		const files = app.vault.getMarkdownFiles();
		data.fileHistory = data.fileHistory.filter((f) =>
			files.some((file) => f === file.path),
		);
		plugin.saveData(data);
	});
};

const trackFileHistory = (plugin: BetterFileSwitcherPlugin) => {
	const { data, app } = plugin;
	app.workspace.on("file-open", async (file) => {
		if (!file) return;
		data.fileHistory = data.fileHistory.filter((f) => f !== file.path);
		data.fileHistory.unshift(file.path);
		await plugin.saveData(data);
	});
};

const loadData = async (plugin: BetterFileSwitcherPlugin) => {
	plugin.data = (await plugin.loadData()) || {
		cmdHistory: [],
		fileHistory: [],
	};
	cleanupFileHistory(plugin);
};

export default class BetterFileSwitcherPlugin extends o.Plugin {
	data = {
		fileHistory: [] as string[],
	};

	async onload() {
		console.info(":: better-file-switcher plugin init");

		await loadData(this);
		trackFileHistory(this);
		addOpenFileSuggestModalCmd(this);
	}

	openFileSuggestModal = (onChooseSuggestion?: (cmd: o.TFile) => void) =>
		openFileSuggestModal(this, onChooseSuggestion);
}
