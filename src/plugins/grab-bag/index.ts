import * as o from "obsidian";
import { addDemoteHeadingsCmd } from "./demote-headings";
import { addInsertDateHeadingCmd } from "./insert-date-heading";
import { addtoggleListTypeCmd } from "./toggle-list-type";
import { initTogglePropertyVisibility } from "./toggle-property-visibility";

export default class GrabBagPlugin extends o.Plugin {
	async onload() {
		console.info(`::`, "grab-bag plugin init");
		addInsertDateHeadingCmd(this);
		addDemoteHeadingsCmd(this);
		addtoggleListTypeCmd(this);
		initTogglePropertyVisibility(this);
	}
}
