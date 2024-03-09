import * as o from "obsidian";

export const getFileSuggestionHTML = (file: o.TFile) =>
	file.path.replace(/\.md$/, "").split("/").join("<strong> / </strong>");
