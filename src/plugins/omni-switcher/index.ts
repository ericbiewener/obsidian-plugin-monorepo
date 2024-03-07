import * as o from "obsidian";
import { addCmdSwitcherCmd } from "./cmd-switcher";
import { cleanupFileHistory, updateFileHistory } from "./file-history";
import { addFileSwitcherCmd } from "./file-switcher";
import { addUnifiedSwitcherCmd } from "./unified-switcher";

export default class OmniSwitcherPlugin extends o.Plugin {
  data = {
    cmdHistory: [] as string[],
    fileHistory: [] as string[],
  };

  async onload() {
    console.info(`::`, "omni-switcher plugin init");
    this.data = (await this.loadData()) || { cmdHistory: [], fileHistory: [] };
    cleanupFileHistory(this);
    console.info(`:: this.data`, this.data);

    addCmdSwitcherCmd(this);
    addFileSwitcherCmd(this);
    addUnifiedSwitcherCmd(this);
    updateFileHistory(this);
  }
}
