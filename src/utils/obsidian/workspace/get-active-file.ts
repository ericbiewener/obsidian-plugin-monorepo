import * as o from "obsidian";
import { assert } from "../../assert";

export const getActiveFile = (app: o.App) => {
	const activeFile = app.workspace.getActiveFile();
	assert(activeFile);
	return activeFile;
};
