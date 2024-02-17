import * as o from "obsidian";
import {
  addJumpToHeadingCmd,
  addJumpToOmniHeadingCmd,
} from "./jump-to-heading";
import { addJumpToOutlineCmd } from "./jump-to-outline";
import {
  addNavigateToHeadingCmd,
  addNavigateToOmniHeadingCmd,
} from "./navigate-to-heading";

export default class JumpPlugin extends o.Plugin {
  async onload() {
    console.info(`::`, "jump plugin init");
    addJumpToHeadingCmd(this);
    addJumpToOmniHeadingCmd(this);
    addNavigateToHeadingCmd(this);
    addNavigateToOmniHeadingCmd(this);
    addJumpToOutlineCmd(this);
  }
}
