import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { getUtils } from "../../utils/obsidian/get-plugin";
import BetterCommandPalettePlugin from "./index";

export const updateCmdHistory = async (
	plugin: BetterCommandPalettePlugin,
	{ id }: o.Command,
) => {
	const { data } = plugin;
	data.cmdHistory = data.cmdHistory.filter((c) => c !== id);
	data.cmdHistory.unshift(id);
	await plugin.saveData(data);
};

const executeAndSaveCmd = async (
	plugin: BetterCommandPalettePlugin,
	cmd: o.Command,
) => {
	const { app } = plugin;
	app.commands.executeCommandById(cmd.id);
	await updateCmdHistory(plugin, cmd);
};

const getCmds = ({ app, data }: BetterCommandPalettePlugin) => {
	const { cmdHistory } = data;
	const { commands } = app.commands;
	const utils = getUtils(app);

	return getUtils(app).unique([
		...cmdHistory.map((c) => commands[c]).filter(utils.isDefined),
		...Object.values(app.commands.commands),
	]);
};

export const openCmdSuggestModal = (
	plugin: BetterCommandPalettePlugin,
	onChooseSuggestion?: (cmd: o.Command) => void,
) =>
	getUtils(plugin.app).openCmdSuggestModal(plugin, {
		getCmds,
		onChooseSuggestion:
			onChooseSuggestion ||
			((cmd: o.Command) => executeAndSaveCmd(plugin, cmd)),
	});

export const addOpenCmdSuggestModalCmd = addCommand<BetterCommandPalettePlugin>(
	"Open Command Palette",
	openCmdSuggestModal,
	{ icon: "terminal" },
);
