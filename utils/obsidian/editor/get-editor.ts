import assert from "assert";
import * as o from "obsidian";

export const getEditor = (app: o.App) => {
  const editor = app.workspace.getActiveViewOfType(o.MarkdownView)?.editor;
  assert(editor);
  return editor;
};
