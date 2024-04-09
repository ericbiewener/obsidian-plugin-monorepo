import * as o from "obsidian";
import { sleep } from "./async/sleep";
import { objGetOrSet } from "./collections/obj-get-or-set";
import {
	getIsUserActive,
	initIsUserActive,
	onUserInactive,
} from "./is-user-active";
import { getLines } from "./obsidian/editor/get-lines";
import { getListChildren } from "./obsidian/editor/get-list-hierachy";

import { unique } from "./collections/unique";
import { onKey } from "./dom/on-key";
import { getEditor } from "./obsidian/editor/get-editor";
import { getFirstLine } from "./obsidian/editor/get-first-line";
import { replaceLinesViaRegex } from "./obsidian/editor/replace-lines-via-regex";
import { goToFileLocation } from "./obsidian/leaf/go-to-file-location";
import { onActiveMarkdownLeafChange } from "./obsidian/leaf/on-active-markdown-leaf-change";
import { getActiveFileMetadata } from "./obsidian/metadata/get-active-file-metadata";
import { createFile } from "./obsidian/vault/create-file";
import { getActiveView } from "./obsidian/workspace/get-active-view";
import { getMarkdownLeaves } from "./obsidian/workspace/get-markdown-leaves";
import {
	onceOnWorkspaceEvent,
	waitForEventToFireOnce,
} from "./obsidian/workspace/once-on-workspace-event";
import { trackLeaves } from "./obsidian/workspace/track-leaves";
import { trackOpenFiles } from "./obsidian/workspace/track-open-files";
import { triggerWorkspaceEventsAfterPluginsLoaded } from "./obsidian/workspace/trigger-workspace-events-after-plugins-loaded";
import * as syntax from "./string/syntax";
import { openCmdSuggestModal } from "./suggest-modals/cmd-suggest-modal";
import { openFileSuggestModal } from "./suggest-modals/file-suggest-modal";
import { openHeaderSuggestModal } from "./suggest-modals/header-suggest-modal";
import { isDefined } from "./type-guards/is-defined";
import { createIcon } from "./ui/create-icon";

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
	unique = unique;

	// async
	sleep = sleep;

	// dom
	onKey = onKey;

	// type guards
	isDefined = isDefined;

	// obsidian
	goToFileLocation = goToFileLocation;
	getMarkdownLeaves = getMarkdownLeaves;
	getActiveView = getActiveView;
	waitForEventToFireOnce = waitForEventToFireOnce;
	getEditor = getEditor;
	getActiveFileMetadata = getActiveFileMetadata;
	getFirstLine = getFirstLine;
	replaceLinesViaRegex = replaceLinesViaRegex;
	onceOnWorkspaceEvent = onceOnWorkspaceEvent;
	createFile = createFile;
}
