import * as o from "obsidian";
import { deleteLines, deleteText } from "./editing/delete-text";
import { insertText } from "./editing/insert-text";
import { getLines } from "./get-lines";
import { getListChildren } from "./get-list-hierachy";
import {
	getIsUserActive,
	initIsUserActive,
	onUserInactive,
} from "./is-user-active";
import { onActiveMarkdownLeafChange } from "./on-active-markdown-leaf-change";
import { openCmdSuggestModal } from "./suggest-modals/cmd-suggest-modal";
import { openFileSuggestModal } from "./suggest-modals/file-suggest-modal";
import * as syntax from "./syntax";
import { iconNames } from "./ui/__generated__/icon-names";
import { createIcon } from "./ui/create-icon";

export default class UtilsPlugin extends o.Plugin {
	async onload() {
		console.info(`::`, "utils plugin init");
		initIsUserActive(this.app);
	}

	isUserActive = getIsUserActive;
	onUserInactive = onUserInactive;
	onActiveMarkdownLeafChange = onActiveMarkdownLeafChange;
	syntax = syntax;
	getListChildren = getListChildren;
	insertText = insertText;
	getLines = getLines;
	deleteLines = deleteLines;
	deleteText = deleteText;
	iconNames = iconNames;
	createIcon = createIcon;
	openCmdSuggestModal = openCmdSuggestModal;
	openFileSuggestModal = openFileSuggestModal;
}
