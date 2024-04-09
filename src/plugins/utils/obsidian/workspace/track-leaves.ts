import * as o from "obsidian";
import { MarkdownLeaf } from "../../../../types/obsidian";
import { getMarkdownLeaves } from "./get-markdown-leaves";

export const trackLeaves = (app: o.App) => {
	let leaves: MarkdownLeaf[] = [];

	app.workspace.on("layout-change", () => {
		const allLeaves = getMarkdownLeaves(app);
		const newLeaves = allLeaves.filter((l) => !leaves.includes(l));
		leaves = allLeaves;

		for (const leaf of newLeaves) {
			app.workspace.trigger("leaf-created", leaf);
		}
	});
};
