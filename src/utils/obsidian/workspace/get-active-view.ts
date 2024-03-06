import * as o from "obsidian";

export const getActiveView = (app: o.App) =>
  app.workspace.getActiveViewOfType(o.MarkdownView);
