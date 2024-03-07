import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { executeAndSaveCmd } from "./execute-and-save-cmd";
import { getCmds } from "./get-cmds";
import OmniSwitcherPlugin from "./index";

const cmdSwitcher = (plugin: OmniSwitcherPlugin) => {
	const { app } = plugin;

	class CmdFuzzySuggestModal extends o.FuzzySuggestModal<o.Command> {
		getItems() {
			return getCmds(plugin);
		}

		getItemText(item: o.Command) {
			return item.name;
		}

		async onChooseItem(item: o.Command) {
			await executeAndSaveCmd(plugin, item);
		}
	}

	const modal = new CmdFuzzySuggestModal(app);
	modal.open();
};

export const addCmdSwitcherCmd = addCommand(
	"Open Omni Command Switcher",
	cmdSwitcher,
);
