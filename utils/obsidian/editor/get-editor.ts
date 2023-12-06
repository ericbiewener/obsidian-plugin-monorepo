import * as o from "obsidian";

export const getEditor = (app: o.App) => {
  const editor = app.workspace.getActiveViewOfType(o.MarkdownView)?.editor;
  if (!editor) throw new Error("No editor");
  return editor;
};
