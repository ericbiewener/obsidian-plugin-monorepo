import * as o from "obsidian";
import { addAddNoteCommandCmd } from "./note-command";

export default class NoteSpecificCommandsPlugin extends o.Plugin {
	async onload() {
		console.info(":: note-specific-commands plugin init");

		addAddNoteCommandCmd(this);
	}
}
