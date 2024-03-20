import * as o from "obsidian";
import { addMoveContentCmd } from "./move-content";

export default class MoveContentPlugin extends o.Plugin {
	async onload() {
		console.info(":: move-content plugin init");
		addMoveContentCmd(this);
	}
}
