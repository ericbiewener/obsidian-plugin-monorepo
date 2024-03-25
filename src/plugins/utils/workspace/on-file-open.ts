import * as o from "obsidian";
import { MarkdownLeaf } from "../../../types/obsidian";
import { getMarkdownLeaves } from "../../../utils/obsidian/workspace/get-markdown-leaves";

export const trackOpenFiles = (app: o.App) => {
	let leaves: MarkdownLeaf[] = [];

	app.workspace.on("layout-change", () => {
		console.info(`::`, "layout-change");
		const allLeaves = getMarkdownLeaves(app);
		const newLeaves = allLeaves.filter((l) => !leaves.includes(l));
		for (const leaf of newLeaves) {
			app.workspace.trigger("file-opened", leaf.view.file);
		}

		leaves = allLeaves;
	});
};
