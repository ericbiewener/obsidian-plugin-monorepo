import * as o from "obsidian";
import { getFullLineRange } from "../range-pos/get-full-line-range";

type Replacer = (substring: string, ...args: any[]) => string;

export const replaceLinesViaRegex = (
	editor: o.Editor,
	re: RegExp,
	replacer: Replacer,
) => {
	const { start, end } = getFullLineRange(editor);
	const content = editor.getRange(start, end);
	const newContent = content.replace(re, replacer);
	editor.replaceRange(newContent, start, end);
};
