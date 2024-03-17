import * as o from "obsidian";

export const getActiveView = (app: o.App): o.MarkdownView | undefined =>
	app.workspace.getActiveViewOfType(o.MarkdownView);
