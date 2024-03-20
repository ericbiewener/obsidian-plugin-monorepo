import * as o from "obsidian";
import { onceOnFileOpen } from "../../utils/obsidian/workspace/once-on-file-open";
import {
	addOpenCmdSuggestModalCmd,
	openCmdSuggestModal,
} from "./command-palette";

export const cleanupCmdHistory = (plugin: BetterCommandPalettePlugin) => {
	const { app, data } = plugin;
	// Do this on `fileOpen` to ensure vault is fully loaded
	onceOnFileOpen(app, () => {
		const cmds = app.commands.commands;
		data.cmdHistory = data.cmdHistory.filter((id) => cmds[id]);
		plugin.saveData(data);
	});
};

const loadData = async (plugin: BetterCommandPalettePlugin) => {
	plugin.data = (await plugin.loadData()) || {
		cmdHistory: [],
	};
	cleanupCmdHistory(plugin);
};

export default class BetterCommandPalettePlugin extends o.Plugin {
	data = {
		cmdHistory: [] as string[],
	};

	async onload() {
		console.info(":: better-command-palette plugin init");

		await loadData(this);
		addOpenCmdSuggestModalCmd(this);
	}

	openCmdSuggestModal = (onChooseSuggestion: (cmd: o.Command) => void) =>
		openCmdSuggestModal(this, onChooseSuggestion);
}
