import * as o from "obsidian";
import { onActiveLeafChange, onUserInactive } from "./password-ui";

export default class ProtectNotePlugin extends o.Plugin {
	async onload() {
		console.info(`::`, "protect-note plugin init");
		onActiveLeafChange(this);
		onUserInactive(this);
	}
}
