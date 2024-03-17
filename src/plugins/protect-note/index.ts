import * as o from "obsidian";
import { initDomListeners, onFileOpen } from "./on-file-open";
import { removePasswordView } from "./remove-password-view";

export default class ProtectNotePlugin extends o.Plugin {
	async onload() {
		onFileOpen(this);
		initDomListeners();
	}

	async onunload() {
		removePasswordView(this.app);
	}
}
