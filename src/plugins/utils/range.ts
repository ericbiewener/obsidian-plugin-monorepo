import * as o from "obsidian";

export const lineRange = (line: number, useFrom = true): o.EditorPosition => ({
	line,
	ch: useFrom ? 0 : Infinity,
});
