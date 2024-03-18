import * as o from "obsidian";
import { MarkdownLeaf } from "../../types/obsidian";

export const isMarkdownLeaf = (
	leaf: o.WorkspaceLeaf | MarkdownLeaf,
): leaf is MarkdownLeaf => leaf.view.getViewType() === "markdown";
