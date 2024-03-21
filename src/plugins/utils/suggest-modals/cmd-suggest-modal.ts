import { filter } from "fuzzy";
import * as o from "obsidian";

type Opts<P extends o.Plugin> = {
	onChooseSuggestion: (cmd: o.Command) => void;
	getCmds?: (plugin: P) => o.Command[];
};

class CmdSuggestModal<P extends o.Plugin> extends o.SuggestModal<o.Command> {
	opts: Opts<P>;
	cmds: o.Command[];

	constructor(plugin: P, opts: Opts<P>) {
		const { app } = plugin;
		super(app);
		this.opts = opts;
		this.cmds = opts.getCmds?.(plugin) || Object.values(app.commands.commands);
	}

	getSuggestions(input: string) {
		return input
			? filter(input, this.cmds, { extract: (c) => c.name }).map(
					(r) => r.original,
			  )
			: this.cmds;
	}

	renderSuggestion(cmd: o.Command, el: HTMLElement) {
		el.innerHTML = cmd.name;
	}

	onChooseSuggestion(cmd: o.Command) {
		this.opts.onChooseSuggestion(cmd);
	}
}

export const openCmdSuggestModal = <P extends o.Plugin>(
	plugin: P,
	opts: Opts<P>,
) => {
	const modal = new CmdSuggestModal(plugin, opts);
	modal.open();
	return modal;
};
