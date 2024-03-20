import { filter } from "fuzzy";
import * as o from "obsidian";

type Opts<P extends o.Plugin> = {
	onChooseSuggestion: (cmd: o.Command) => void;
	getCmds?: (plugin: P) => o.Command[];
};

export const openCmdSuggestModal = <P extends o.Plugin>(
	plugin: P,
	{ onChooseSuggestion, getCmds }: Opts<P>,
) => {
	const { app } = plugin;

	const cmds = getCmds ? getCmds(plugin) : Object.values(app.commands.commands);

	// Not using o.FuzzySuggestModal because that doesn't let us apply our
	// cmdHistory to the fuzzy cmd results
	class CmdSuggestModal extends o.SuggestModal<o.Command> {
		getSuggestions(input: string) {
			return input
				? filter(input, cmds, { extract: (c) => c.name }).map((r) => r.original)
				: cmds;
		}

		renderSuggestion(cmd: o.Command, el: HTMLElement) {
			el.innerHTML = cmd.name;
		}

		onChooseSuggestion = onChooseSuggestion;
	}

	const modal = new CmdSuggestModal(app);
	modal.open();
	return modal;
};
