import * as o from "obsidian";
import { getMarkdownLeaves } from "./get-markdown-leaves";

export const trackOpenFiles = (app: o.App) => {
	let openPaths: string[] = [];

	// Surprising that `layout-change` is the correct event
	app.workspace.on("layout-change", () => {
		const leaves = getMarkdownLeaves(app);
		const leavesWithNewFiles = leaves.filter(
			(l) => !openPaths.includes(l.view.file.path),
		);
		openPaths = leaves.map((p) => p.view.file.path);

		for (const leaf of leavesWithNewFiles) {
			app.workspace.trigger("file-opened", leaf);
		}
	});
};
