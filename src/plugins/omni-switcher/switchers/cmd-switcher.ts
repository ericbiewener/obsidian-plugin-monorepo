import * as o from "obsidian";
import { addCommand } from "../../../add-command";
import { executeAndSaveCmd } from "../execute-and-save-cmd";
import { fuzzyFilterCmds } from "../fuzzy-filtering";
import { getCmds } from "../get-cmds";
import OmniSwitcherPlugin from "../index";

const cmdSwitcher = (plugin: OmniSwitcherPlugin) => {
	const { app } = plugin;

	const cmds = getCmds(plugin);

	// Not using o.FuzzySuggestModal because that doesn't let us apply our
	// cmdHistory to the fuzzy cmd results
	class CmdSuggestModal extends o.SuggestModal<o.Command> {
		getSuggestions(input: string) {
			return fuzzyFilterCmds(input, cmds);
		}

		renderSuggestion(cmd: o.Command, el: HTMLElement) {
			el.innerHTML = cmd.name;
		}

		async onChooseSuggestion(cmd: o.Command) {
			await executeAndSaveCmd(plugin, cmd);
		}
	}

	const modal = new CmdSuggestModal(app);
	modal.open();
};

export const addCmdSwitcherCmd = addCommand(
	"Open Omni Command Switcher",
	cmdSwitcher,
);
