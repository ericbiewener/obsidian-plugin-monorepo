import * as o from "obsidian";
import { addOmniSwitcherCmd } from "./omni-switcher";

export default class OmniSwitcherPlugin extends o.Plugin {
  async onload() {
    console.info(`::`, "omni-switcher plugin init");
    addOmniSwitcherCmd(this);
  }

  async onunload() {}
}
