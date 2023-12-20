import * as o from "obsidian";
import {
  addJumpToHeadingCmd,
  addJumpToOmniHeadingCmd,
} from "./jump-to-heading";
import {
  addNavigateToOmniHeadingCmd,
  addNavigateToHeadingCmd,
} from "./navigate-to-heading";
import { addJumpToOutlineCmd } from "./jump-to-outline";

export default class JumpPlugin extends o.Plugin {
  async onload() {
    console.info(`::`, "jump plugin init");
    addJumpToHeadingCmd(this);
    addJumpToOmniHeadingCmd(this);
    addNavigateToHeadingCmd(this);
    addNavigateToOmniHeadingCmd(this);
    addJumpToOutlineCmd(this);
  }

  async onunload() {}
}
