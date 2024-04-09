import * as o from "obsidian";
import { getSelectedLines } from "../selection/get-selected-lines";

export const getFullLineRange = (editor: o.Editor) => {
	const { start, end } = getSelectedLines(editor);
	return { start: { line: start, ch: 0 }, end: { line: end, ch: Infinity } };
};
