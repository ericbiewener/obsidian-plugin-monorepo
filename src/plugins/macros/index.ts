import * as o from "obsidian";
import { addJournalEntryCmd } from "./add-journal-entry";

export default class MacrosPlugin extends o.Plugin {
	async onload() {
		console.info(`::`, "macros plugin init");
		addJournalEntryCmd(this);
	}
}
