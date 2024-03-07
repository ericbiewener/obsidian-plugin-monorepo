import { filter } from "fuzzy";
import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { createEl } from "../../utils/dom/create-el";
import { addNewFileButtonToModal } from "./create-file-button";
import { createNoResultsEl } from "./create-no-results-el";
import { executeAndSaveCmd } from "./execute-and-save-cmd";
import { getCmds } from "./get-cmds";
import { getCreateFileCallbacks } from "./get-create-file-callbacks";
import { getFilesByLastOpened } from "./get-files-by-last-opened";
import OmniSwitcherPlugin from "./index";
import style from "./style.module.css";

type Suggestion = o.Command | o.TFile;

const MAX_SUGGESTIONS = 100; // Set by Obsidian

const createSuggestionSubContainer = (
	parent: HTMLElement,
	children: HTMLElement[],
) => {
	const el = createEl("div", parent, children);
	el.className = style.suggestionSubContainer;
	return el;
};

const unifiedSwitcher = (plugin: OmniSwitcherPlugin) => {
	const files = getFilesByLastOpened(plugin);
	const cmds = getCmds(plugin);

	let suggestionCount = 0;
	const fileSuggestionEls: HTMLElement[] = [];
	const cmdSuggestionEls: HTMLElement[] = [];

	const getSuggestions = (input: string) => {
		fileSuggestionEls.length = 0;
		cmdSuggestionEls.length = 0;

		// We need to
		if (!input) return [...files, ...cmds];

		const isCmd = input[0] === ",";
		const isFile = input[0] === ".";
		if (isCmd || isFile) {
			input = input.slice(1);
		}

		const filteredFiles = isCmd
			? []
			: filter(input, files, {
					extract: (s) => s.basename,
			  }).map((r) => r.original);

		const filteredCmds = isFile
			? []
			: filter(input, cmds, { extract: (s) => s.name }).map((r) => r.original);

		return [...filteredFiles, ...filteredCmds];
	};

	const Modal = class extends o.SuggestModal<Suggestion> {
		getSuggestions(input: string) {
			modal.inputEl.removeEventListener("keyup", createFileOnEnter);
			const suggestions = getSuggestions(input);
			suggestionCount = suggestions.length;
			return suggestions;
		}

		async onChooseSuggestion(suggestion: Suggestion) {
			if (suggestion instanceof o.TFile) {
				await plugin.app.workspace.openLinkText(suggestion.path, "", false);
			} else {
				await executeAndSaveCmd(plugin, suggestion);
			}
		}

		renderSuggestion(suggestion: Suggestion, el: HTMLElement) {
			if (suggestion instanceof o.TFile) {
				el.innerHTML = suggestion.basename;
				fileSuggestionEls.push(el);
			} else {
				el.innerHTML = suggestion.name;
				cmdSuggestionEls.push(el);
			}

			const suggestionsCreated =
				cmdSuggestionEls.length + fileSuggestionEls.length;

			if (suggestionsCreated === Math.min(suggestionCount, MAX_SUGGESTIONS)) {
				const { resultContainerEl } = modal;
				if (fileSuggestionEls.length) {
					createSuggestionSubContainer(resultContainerEl, fileSuggestionEls);
				}

				if (cmdSuggestionEls.length) {
					createSuggestionSubContainer(resultContainerEl, cmdSuggestionEls);
				}

				if (cmdSuggestionEls.length && fileSuggestionEls.length) {
					const divider = document.createElement("div");
					divider.addClass(style.suggestionSubContainerDivider);
					resultContainerEl.insertAfter(divider, resultContainerEl.firstChild);
				}

				// Set static max height, otherwise the two result containers don't
				// correctly take up equivalent heights. No idea why. CSS!
				console.log(resultContainerEl);
				// resultContainerEl.style.height = `${resultContainerEl.offsetHeight}px`;
			}
		}

		onNoSuggestion() {
			super.onNoSuggestion();
			createNoResultsEl(this, createFileCb, createFileOnEnter);
		}
	};

	const modal = new Modal(plugin.app);
	const { createFileCb, createFileOnEnter } = getCreateFileCallbacks(
		plugin,
		modal,
	);
	addNewFileButtonToModal(plugin, modal);
	modal.resultContainerEl.classList.add(style.suggestionContainer);

	modal.open();
};

export const addUnifiedSwitcherCmd = addCommand(
	"Open Unified Switcher",
	unifiedSwitcher,
);
