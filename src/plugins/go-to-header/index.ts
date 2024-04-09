import * as o from "obsidian";
import { addOpenHeaderSuggestModalCmd } from "./go-to-header";

export default class GoToHeaderPlugin extends o.Plugin {
	async onload() {
		console.info(":: go-to-header plugin init");

		addOpenHeaderSuggestModalCmd(this);
	}
}
