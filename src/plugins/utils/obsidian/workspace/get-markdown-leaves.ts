import * as o from "obsidian";
import { MarkdownLeaf } from "../../../../types/obsidian";

export const getMarkdownLeaves = (app: o.App) =>
	app.workspace.getLeavesOfType("markdown") as MarkdownLeaf[];
