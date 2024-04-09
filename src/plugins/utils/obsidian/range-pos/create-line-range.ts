import * as o from "obsidian";

export const createLineRange = (
	line: number,
	useFrom = true,
): o.EditorPosition => ({
	line,
	ch: useFrom ? 0 : Infinity,
});
