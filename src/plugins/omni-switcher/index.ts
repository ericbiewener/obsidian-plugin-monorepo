import * as o from "obsidian";
import { cleanupCmdHistory } from "./cmd-history";
import { addCmdSwitcherCmd } from "./cmd-switcher";
import { cleanupFileHistory, updateFileHistory } from "./file-history";
import { addFileSwitcherCmd } from "./file-switcher";
import { addUnifiedSwitcherCmd } from "./unified-switcher";

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
		addUnifiedSwitcherCmd(this);
		updateFileHistory(this);
	}
}
