import * as o from "obsidian";

export const locToEditorPos = (loc: o.Loc): o.EditorPosition => ({
	line: loc.line,
	ch: loc.col,
});
