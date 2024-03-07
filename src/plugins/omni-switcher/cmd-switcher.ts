import { filter } from "fuzzy";
import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { executeAndSaveCmd } from "./execute-and-save-cmd";
import { getCmds } from "./get-cmds";
import OmniSwitcherPlugin from "./index";

const cmdSwitcher = (plugin: OmniSwitcherPlugin) => {
	const { app } = plugin;

	const cmds = getCmds(plugin);

	// Not using o.FuzzySuggestModal because that doesn't let us apply our cmdHistory to the fuzzy cmd results
	class CmdFuzzySuggestModal extends o.SuggestModal<o.Command> {
		getSuggestions(input: string) {
			return input
				? filter(input, cmds, { extract: (s) => s.name }).map((r) => r.original)
				: cmds;
		}

		renderSuggestion(cmd: o.Command, el: HTMLElement) {
			el.innerHTML = cmd.name;
		}

		async onChooseSuggestion(suggestion: o.Command) {
			await executeAndSaveCmd(plugin, suggestion);
		}
	}

	const modal = new CmdFuzzySuggestModal(app);
	modal.open();
};

export const addCmdSwitcherCmd = addCommand(
	"Open Omni Command Switcher",
	cmdSwitcher,
);
