import * as o from "obsidian";
import { addInsertTimeHeaderCmd } from "./insert-time-header";
import { addDemoteHeadingsCmd } from "./demote-headings";
import { addtoggleListTypeCmd } from "./toggle-list-type";

export default class GrabBagPlugin extends o.Plugin {
  async onload() {
    console.info(`::`, "grab-bag plugin init");
    addInsertTimeHeaderCmd(this);
    addDemoteHeadingsCmd(this);
    addtoggleListTypeCmd(this);
  }

  async onunload() {}
}
