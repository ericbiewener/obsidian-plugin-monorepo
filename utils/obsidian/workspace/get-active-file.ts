import assert from "assert";
import * as o from "obsidian";

export const getActiveFile = (app: o.App) => {
  const activeFile = app.workspace.getActiveFile();
  assert(activeFile);
  return activeFile;
};
