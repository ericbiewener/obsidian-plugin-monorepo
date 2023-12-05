import * as o from "obsidian";
import { addInsertTimeHeaderCmd } from "./insert-time-header";

export default class GrabBagPlugin extends o.Plugin {
  async onload() {
    console.info(`::`, "grab-bag plugin init");
    addInsertTimeHeaderCmd(this);
  }

  async onunload() {}
}
