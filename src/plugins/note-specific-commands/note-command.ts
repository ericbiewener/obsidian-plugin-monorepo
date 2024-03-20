import { filter } from "fuzzy";
import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { getUtils } from "../../utils/obsidian/get-utils";

const addNoteCommand = (plugin: o.Plugin) => {
	const { app } = plugin;
	const utils = getUtils(app);

	class IconSuggestModal extends o.SuggestModal<string> {
		getSuggestions(input: string) {
			const iconNames = utils.iconNames as unknown as string[];
			return input
				? filter<string>(input, iconNames).map((r) => r.original)
				: iconNames;
		}

		async onChooseSuggestion(file: o.TFile) {}

		renderSuggestion(file: o.TFile, el: HTMLElement) {
			el.innerHTML = getFileSuggestionHTML(file);
		}

		onNoSuggestion() {
			super.onNoSuggestion();
			createNoResultsEl(this, createFileCb, createFileOnEnter);
		}
	}

	const modal = new IconSuggestModal(plugin.app);
	const { createFileCb, createFileOnEnter } = getCreateFileCallbacks(
		plugin,
		modal,
	);
	addNewFileButtonToModal(plugin, modal);

	modal.open();
};

export const addAddNoteCommandCmd = addCommand(
	"Add note command",
	addNoteCommand,
);
