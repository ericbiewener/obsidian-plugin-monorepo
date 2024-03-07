import * as o from "obsidian";
import OmniSwitcherPlugin from ".";

export const executeAndSaveCmd = async (
  plugin: OmniSwitcherPlugin,
  { id }: o.Command,
) => {
  const { app, data } = plugin;
  app.commands.executeCommandById(id);
  data.cmdHistory = data.cmdHistory.filter((c) => c !== id);
  data.cmdHistory.unshift(id);
  await plugin.saveData(data);
};
