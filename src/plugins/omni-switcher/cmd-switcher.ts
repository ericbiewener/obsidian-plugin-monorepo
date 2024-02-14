import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { unique } from "../../utils/collections/unique";
import OmniSwitcherPlugin from "./index";

const cmdSwitcher = (plugin: OmniSwitcherPlugin) => {
  const { cmdHistory } = plugin.data;

  class CmdFuzzySuggestModal extends o.FuzzySuggestModal<o.Command> {
    getItems() {
      const { commands } = plugin.app.commands;
      return unique([
        ...cmdHistory.map((c) => commands[c]),
        ...Object.values(plugin.app.commands.commands),
      ]);
    }

    getItemText(item: o.Command) {
      return item.name;
    }

    onChooseItem(item: o.Command) {
      plugin.app.commands.executeCommandById(item.id);
      cmdHistory.unshift(item.id);
    }
  }

  const modal = new CmdFuzzySuggestModal(plugin.app);
  modal.open();
};

export const addCmdSwitcherCmd = addCommand(
  "Open Omni Command Switcher",
  cmdSwitcher,
);
