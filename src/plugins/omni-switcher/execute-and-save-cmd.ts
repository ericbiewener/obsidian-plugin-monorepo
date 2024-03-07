import * as o from "obsidian";
import OmniSwitcherPlugin from ".";

export const executeAndSaveCmd = (
	{ app, data }: OmniSwitcherPlugin,
	{ id }: o.Command,
) => {
	app.commands.executeCommandById(id);
	data.cmdHistory.unshift(id);
};
