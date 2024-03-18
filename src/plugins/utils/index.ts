import * as o from "obsidian";
import {
	getIsUserActive,
	initIsUserActive,
	onUserInactive,
} from "./is-user-active";
import { onActiveMarkdownLeafChange } from "./on-active-markdown-leaf-change";

export default class UtilsPlugin extends o.Plugin {
	async onload() {
		console.info(`::`, "utils plugin init");
		initIsUserActive(this.app);
	}

	isUserActive = getIsUserActive;
	onUserInactive = onUserInactive;
	onActiveMarkdownLeafChange = onActiveMarkdownLeafChange;
}
