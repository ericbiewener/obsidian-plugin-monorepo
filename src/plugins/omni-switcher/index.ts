import * as o from "obsidian";
import { addCmdSwitcherCmd } from "./cmd-switcher";
import { addFileSwitcherCmd } from "./file-switcher";

export default class OmniSwitcherPlugin extends o.Plugin {
  data = {
    cmdHistory: [] as string[],
  };

  async onload() {
    console.info(`::`, "omni-switcher plugin init");
    addCmdSwitcherCmd(this);
    addFileSwitcherCmd(this);
  }

  async onunload() {}
}
