import * as o from "obsidian";
import { addDemoteHeadingsCmd } from "./demote-headings";
import { addInsertDateHeaderCmd } from "./insert-date-header";
import { addInsertTimeHeaderCmd } from "./insert-time-header";
import { addtoggleListTypeCmd } from "./toggle-list-type";
import { initTogglePropertyVisibility } from "./toggle-property-visibility";
// import { addSearchOutlineCmd } from "./search-outline";

export default class GrabBagPlugin extends o.Plugin {
	async onload() {
		console.info(`::`, "grab-bag plugin init");
		addInsertTimeHeaderCmd(this);
		addInsertDateHeaderCmd(this);
		addDemoteHeadingsCmd(this);
		addtoggleListTypeCmd(this);
		initTogglePropertyVisibility(this);
		// addSearchOutlineCmd(this);
	}
}
