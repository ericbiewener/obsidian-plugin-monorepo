import * as o from "obsidian";
import { assert } from "../../assert";
import { getActiveView } from "../workspace/get-active-view";

export const getEditor = (app: o.App) => {
  const editor = getActiveView(app)?.editor;
  assert(editor);
  return editor;
};
