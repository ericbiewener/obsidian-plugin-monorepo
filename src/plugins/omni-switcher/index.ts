import * as o from "obsidian";
import { cleanupCmdHistory } from "./data/cmd-history";
import { cleanupFileHistory, updateFileHistory } from "./data/file-history";
import { addCmdSwitcherCmd } from "./switchers/cmd-switcher";
import { OnChooseSuggestion } from "./switchers/file-switcher";
import {
	addFileSwitcherCmd,
	openFileSwitcher,
} from "./switchers/file-switcher";

const loadData = async (plugin: OmniSwitcherPlugin) => {
	plugin.data = (await plugin.loadData()) || {
		cmdHistory: [],
		fileHistory: [],
	};
	cleanupFileHistory(plugin);
	cleanupCmdHistory(plugin);
};

export default class OmniSwitcherPlugin extends o.Plugin {
	data = {
		cmdHistory: [] as string[],
		fileHistory: [] as string[],
	};

	async onload() {
		console.info(`::`, "omni-switcher plugin init");

		await loadData(this);

		addCmdSwitcherCmd(this);
		addFileSwitcherCmd(this);
		updateFileHistory(this);
	}

	openFileSwitcher = (onChooseSuggestion?: OnChooseSuggestion) =>
		openFileSwitcher(this, onChooseSuggestion);
}
