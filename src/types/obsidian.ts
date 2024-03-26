import * as o from "obsidian";
import { Merge } from "type-fest";

export interface MarkdownLeaf
	extends Merge<
		o.WorkspaceLeaf,
		{ view: o.MarkdownView & { file: o.TFile } }
	> {}
