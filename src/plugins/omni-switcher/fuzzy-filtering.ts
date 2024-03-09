import { filter } from "fuzzy";
import * as o from "obsidian";

export const fuzzyFilterFiles = (input: string, files: o.TFile[]) =>
	input
		? filter(input, files, { extract: (f) => f.path }).map((r) => r.original)
		: files;

export const fuzzyFilterCmds = (input: string, cmds: o.Command[]) =>
	input
		? filter(input, cmds, { extract: (c) => c.name }).map((r) => r.original)
		: cmds;
