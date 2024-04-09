import * as o from "obsidian";
import { isList } from "../../string/syntax";

const getIndentationLevel = (line: string) =>
	line.length - line.trimStart().length;

export const getListChildren = (editor: o.Editor, from: number) => {
	let line = editor.getLine(from);
	const indentationLevel = getIndentationLevel(line);

	const lines = { from, to: from };

	while (line) {
		if (!isList(line)) break;
		const newIndentationLevel = getIndentationLevel(line);
		if (newIndentationLevel <= indentationLevel) break;
		lines.to = from;
		line = editor.getLine(++from);
	}

	return lines;
};
