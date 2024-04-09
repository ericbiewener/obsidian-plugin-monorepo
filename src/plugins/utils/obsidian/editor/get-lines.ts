import * as o from "obsidian";
import { createLineRange } from "../range-pos/create-line-range";

export const getLines = (editor: o.Editor, from: number, to: number) =>
	editor.getRange(createLineRange(from), createLineRange(to, false));
