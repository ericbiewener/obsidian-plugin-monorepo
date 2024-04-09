import * as o from "obsidian";
import { sleep } from "./async/sleep";
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
import { openHeaderSuggestModal } from "./suggest-modals/header-suggest-modal";
import * as syntax from "./syntax";
import { createIcon } from "./ui/create-icon";
import { trackLeaves } from "./workspace/track-leaves";
import { trackOpenFiles } from "./workspace/track-open-files";
import { triggerWorkspaceEventsAfterPluginsLoaded } from "./workspace/trigger-workspace-events-after-plugins-loaded";

export default class UtilsPlugin extends o.Plugin {
	async onload() {
		console.info(`::`, "utils plugin init");
		initIsUserActive(this.app);
		trackOpenFiles(this.app);
		trackLeaves(this.app);
		triggerWorkspaceEventsAfterPluginsLoaded(this.app);
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
	openHeaderSuggestModal = openHeaderSuggestModal;

	// collections
	objGetOrSet = objGetOrSet;

	// async
	sleep = sleep;
}
