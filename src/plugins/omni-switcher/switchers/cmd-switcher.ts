import * as o from "obsidian";
import { addCommand } from "../../../add-command";
import { unique } from "../../../utils/collections/unique";
import { isDefined } from "../../../utils/is-defined";
import { getUtils } from "../../../utils/obsidian/get-utils";
import { executeAndSaveCmd } from "../execute-and-save-cmd";
import OmniSwitcherPlugin from "../index";

const getCmds = ({ app, data }: OmniSwitcherPlugin) => {
	const { cmdHistory } = data;
	const { commands } = app.commands;

	return unique([
		...cmdHistory.map((c) => commands[c]).filter(isDefined),
		...Object.values(app.commands.commands),
	]);
};

const openCmdSuggestModal = (plugin: OmniSwitcherPlugin) => {
	const utils = getUtils(plugin.app);
	utils.openCmdSuggestModal(
		plugin,
		(cmd: o.Command) => executeAndSaveCmd(plugin, cmd),
		getCmds,
	);
};

export const addCmdSwitcherCmd = addCommand<OmniSwitcherPlugin>(
	"Open Omni Command Switcher",
	openCmdSuggestModal,
);
