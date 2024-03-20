import * as o from "obsidian";
import { addCommand } from "../../../add-command";
import { addNewFileButtonToModal } from "../create-file-button";
import { createNoResultsEl } from "../create-no-results-el";
import { fuzzyFilterFiles } from "../fuzzy-filtering";
import { getCreateFileCallbacks } from "../get-create-file-callbacks";
import { getFileSuggestionHTML } from "../get-file-suggestion-html";
import { getFilesByLastOpened } from "../get-files-by-last-opened";
import OmniSwitcherPlugin from "../index";

export type OnChooseSuggestion = (file: o.TFile) => unknown;

export const openFileSwitcher = (
	plugin: OmniSwitcherPlugin,
	onChooseSuggestion?: OnChooseSuggestion,
) => {
	const files = getFilesByLastOpened(plugin);
	// Not using o.FuzzySuggestModal because that doesn't let us apply our
	// fileHistory to the fuzzy cmd results
	class FileSuggestModal extends o.SuggestModal<o.TFile> {
		getSuggestions(input: string) {
			modal.inputEl.removeEventListener("keyup", createFileOnEnter);
			return fuzzyFilterFiles(input, files);
		}

		async onChooseSuggestion(file: o.TFile) {
			await (onChooseSuggestion
				? onChooseSuggestion(file)
				: plugin.app.workspace.openLinkText(file.path, "", false));
		}

		renderSuggestion(file: o.TFile, el: HTMLElement) {
			el.innerHTML = getFileSuggestionHTML(file);
		}

		onNoSuggestion() {
			super.onNoSuggestion();
			createNoResultsEl(this, createFileCb, createFileOnEnter);
		}
	}

	const modal = new FileSuggestModal(plugin.app);
	const { createFileCb, createFileOnEnter } = getCreateFileCallbacks(
		plugin,
		modal,
	);
	addNewFileButtonToModal(plugin, modal);

	modal.open();
};

export const addFileSwitcherCmd = addCommand(
	"Open Omni File Switcher",
	openFileSwitcher,
);
