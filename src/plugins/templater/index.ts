import * as o from "obsidian";
import { addInsertTemplateInstanceCmd } from "./insert-template-instance";

export default class GrabBagPlugin extends o.Plugin {
  async onload() {
    console.info(`::`, "templater plugin init");
    addInsertTemplateInstanceCmd(this);
  }
}
