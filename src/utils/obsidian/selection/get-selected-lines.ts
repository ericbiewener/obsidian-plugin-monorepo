import * as o from "obsidian";

export const getSelectedLines = (editor: o.Editor) => {
	const from = editor.getCursor("from").line;
	const to = editor.getCursor("to").line;
	return from < to ? { start: from, end: to } : { start: to, end: from };
};
