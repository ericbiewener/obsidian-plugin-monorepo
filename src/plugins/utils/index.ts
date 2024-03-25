import * as o from "obsidian";
import { objGetOrSet } from "./collections/obj-get-or-set";
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
import { createIcon } from "./ui/create-icon";
import { trackOpenFiles } from "./workspace/on-file-open";

export default class UtilsPlugin extends o.Plugin {
	async onload() {
		console.info(`::`, "utils plugin init");
		initIsUserActive(this.app);
		trackOpenFiles(this.app);
		this.app.workspace.on("file-opened", (file) => {
			console.info(`::`, "file actually opened", file.path);
		});
		this.app.workspace.on("file-open", (file) => {
			console.info(`::`, "NOT REAL", file.path);
		});
	}

	isUserActive = getIsUserActive;
	onUserInactive = onUserInactive;
	onActiveMarkdownLeafChange = onActiveMarkdownLeafChange;
	syntax = syntax;
	getListChildren = getListChildren;
	getLines = getLines;
	createIcon = createIcon;
	openCmdSuggestModal = openCmdSuggestModal;
	openFileSuggestModal = openFileSuggestModal;

	// Collections
	objGetOrSet = objGetOrSet;
}
