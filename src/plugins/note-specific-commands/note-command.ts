import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { getUtils } from "../../utils/obsidian/get-plugin";

const addNoteCommand = (plugin: o.Plugin) => {
	const { app } = plugin;

	getUtils(app).openIconSuggestModal(plugin, {
		onChooseSuggestion: (icon: o.IconName) => {
			console.info("icon", icon);
		},
	});
};

export const addAddNoteCommandCmd = addCommand(
	"Add note command",
	addNoteCommand,
);
