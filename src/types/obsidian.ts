import * as o from "obsidian";
import { Merge } from "type-fest";

export type MarkdownLeaf = Merge<
	o.WorkspaceLeaf,
	{ view: o.MarkdownView & { file: o.TFile } }
>;
