import * as o from "obsidian";
import { addCommand } from "../../add-command";
import baseStyle from "../../styles/base.module.css";
import { onKey } from "../../utils/dom/on-key";
import { NO_NOTES_FOUND } from "./constants";
import {
	addNewFileButtonToModal,
	createFileFromInput,
} from "./create-file-button";
import { createNoResultsEl } from "./create-no-results-el";
import { getCreateFileCallbacks } from "./get-create-file-callbacks";
import { getFilesByLastOpened } from "./get-files-by-last-opened";
import OmniSwitcherPlugin from "./index";
import style from "./style.module.css";

const fileSwitcher = (plugin: OmniSwitcherPlugin) => {
	class FileFuzzySuggestModal extends o.FuzzySuggestModal<o.TFile> {
		getItems() {
			modal.inputEl.removeEventListener("keyup", createFileOnEnter);
			return getFilesByLastOpened(plugin);
		}

		getItemText(item: o.TFile) {
			return item.path;
		}

		async onChooseItem(item: o.TFile) {
			await plugin.app.workspace.openLinkText(item.path, "", false);
		}

		renderSuggestion({ item }: o.FuzzyMatch<o.TFile>, el: HTMLElement) {
			el.innerHTML = item.path
				.replace(/\.md$/, "")
				.split("/")
				.join("<strong> / </strong>");
		}

		onNoSuggestion() {
			super.onNoSuggestion();
			createNoResultsEl(this, createFileCb, createFileOnEnter);
		}
	}

	const modal = new FileFuzzySuggestModal(plugin.app);
	const { createFileCb, createFileOnEnter } = getCreateFileCallbacks(
		plugin,
		modal,
	);
	addNewFileButtonToModal(plugin, modal);

	modal.open();
};

export const addFileSwitcherCmd = addCommand(
	"Open Omni File Switcher",
	fileSwitcher,
);
