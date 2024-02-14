import * as o from "obsidian";
import { assert } from "../../assert";

export const getEditor = (app: o.App) => {
  const editor = app.workspace.getActiveViewOfType(o.MarkdownView)?.editor;
  assert(editor);
  return editor;
};
