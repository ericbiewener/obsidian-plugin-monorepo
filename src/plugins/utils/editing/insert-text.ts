import * as o from "obsidian";

export const insertText = (
	editor: o.Editor,
	txt: string,
	from = editor.getCursor("from"),
	to = from || editor.getCursor("to"),
) => {
	editor.replaceRange(txt, from, to);
	editor.setCursor(to);
};
