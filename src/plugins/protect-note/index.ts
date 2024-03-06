import * as o from "obsidian";
import { domService } from "../../dom-service";

export default class ProtectNotePlugin extends o.Plugin {
	async onload() {
		this.app.workspace.on("file-open", (file) => {
			this.app.workspace.getActiveViewOfType(o.MarkdownView)?.editor;
			console.log("open");
		});
	}

	async onunload() {
		domService.cleanUp();
	}
}
