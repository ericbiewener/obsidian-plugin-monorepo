import OmniSwitcherPlugin from ".";
import { unique } from "../../utils/collections/unique";

export const getCmds = ({ app, data }: OmniSwitcherPlugin) => {
  const { cmdHistory } = data;
  const { commands } = app.commands;

  return unique([
    ...cmdHistory.map((c) => commands[c]),
    ...Object.values(app.commands.commands),
  ]);
};
