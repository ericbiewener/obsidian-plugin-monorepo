import OmniSwitcherPlugin from ".";
import { unique } from "../../utils/collections/unique";
import { isDefined } from "../../utils/is-defined";

export const getCmds = ({ app, data }: OmniSwitcherPlugin) => {
	const { cmdHistory } = data;
	const { commands } = app.commands;

	return unique([
		...cmdHistory.map((c) => commands[c]).filter(isDefined),
		...Object.values(app.commands.commands),
	]);
};
