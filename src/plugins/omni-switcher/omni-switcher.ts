import * as o from "obsidian";
import { addCommand } from "../../add-command";

const omniSwitcher = ({ app }: o.Plugin) => {};

export const addOmniSwitcherCmd = addCommand(
  "Open Omni Switcher",
  omniSwitcher,
);
