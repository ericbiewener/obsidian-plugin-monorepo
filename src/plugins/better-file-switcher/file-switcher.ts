import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { CLICK_VERB } from "../../contants";
import baseStyle from "../../styles/base.module.css";
import { onKey } from "../../utils/dom/on-key";
import { getUtils } from "../../utils/obsidian/get-utils";
import { createFile } from "../../utils/obsidian/vault/create-file";
import BetterFileSwitcherPlugin from "./index";
import style from "./style/style.module.css";

const NO_NOTES_FOUND = `No notes found. ${CLICK_VERB} here or press Enter to create a new one.`;

const getFilesByLastOpened = ({ data, app }: BetterFileSwitcherPlugin) => {
	const fileToIdx: Record<string, number> = {};

	for (let i = 0; i < data.fileHistory.length; i++) {
		fileToIdx[data.fileHistory[i]!] = i;
	}

	return app.vault.getMarkdownFiles().sort((a, b) => {
		const aIdx = fileToIdx[a.path];
		const bIdx = fileToIdx[b.path];

		if (aIdx != null) {
			return bIdx == null ? -1 : aIdx - bIdx;
		}

		return bIdx == null ? a.path.localeCompare(b.path) : 1;
	});
};

const createFileFromInput = async (
	{ app }: o.Plugin,
	modal: o.SuggestModal<unknown>,
) => {
	const basename = modal.inputEl.value.trim();
	if (basename) {
		await createFile(app, `${basename}.md`);
		modal.close();
	}
};

const createNoResultsEl = (
	modal: o.SuggestModal<unknown>,
	createFileCb: () => void,
	createFileOnEnter: (e: KeyboardEvent) => void,
) => {
	const el = modal.resultContainerEl.querySelector(".suggestion-empty")!;
	el.innerHTML = NO_NOTES_FOUND;
	el.classList.add(style.noResultsMsg, baseStyle.hoverable);
	el.addEventListener("click", createFileCb);
	modal.inputEl.addEventListener("keyup", createFileOnEnter);
};

const addNewFileButtonToModal = (
	plugin: o.Plugin,
	modal: o.SuggestModal<unknown>,
	createFileCb: () => void,
) => {
	const el = getUtils(plugin.app).createIcon("file-plus-2", createFileCb);
	el.classList.add(baseStyle.iconButton, style.inputIconButton);
	modal.inputEl.insertAdjacentElement("afterend", el);
};

export const openFileSuggestModal = (
	plugin: BetterFileSwitcherPlugin,
	onChooseSuggestion?: (file: o.TFile) => void,
) => {
	const modal = getUtils(plugin.app).openFileSuggestModal(plugin, {
		getFiles: getFilesByLastOpened,
		onChooseSuggestion:
			onChooseSuggestion ||
			((file: o.TFile) =>
				plugin.app.workspace.openLinkText(file.path, "", false)),

		onNoSuggestion: (modal) => {
			createNoResultsEl(modal, createFileCb, createFileOnEnter);
		},
	});

	const createFileCb = () => createFileFromInput(plugin, modal);
	const createFileOnEnter = onKey({ Enter: createFileCb });

	addNewFileButtonToModal(plugin, modal, createFileCb);
};

export const addOpenFileSuggestModalCmd = addCommand<BetterFileSwitcherPlugin>(
	"Open File Switcher",
	openFileSuggestModal,
);
