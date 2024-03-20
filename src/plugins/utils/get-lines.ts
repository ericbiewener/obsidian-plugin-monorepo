import * as o from "obsidian";
import { lineRange } from "./range";

export const getLines = (editor: o.Editor, from: number, to: number) =>
	editor.getRange(lineRange(from), lineRange(to, false));
