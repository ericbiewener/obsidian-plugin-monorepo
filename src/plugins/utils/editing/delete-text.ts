import * as o from "obsidian";
import { lineRange } from "../range";
import { insertText } from "./insert-text";

export const deleteText = (
	editor: o.Editor,
	from: o.EditorPosition,
	to: o.EditorPosition,
) => insertText(editor, "", from, to);

export const deleteLines = (editor: o.Editor, from: number, to: number) =>
	deleteText(editor, lineRange(from), lineRange(to, false));
