import * as o from "obsidian";
import { getMarkdownLeaves } from "../../../utils/obsidian/workspace/get-markdown-leaves";
import { sleep } from "../async/sleep";

declare module "obsidian" {
	interface Plugin {
		onLoadFinished: boolean;
	}
}

async function waitForPluginsToLoad(app: o.App) {
	while (true) {
		const allLoaded = Object.values(app.plugins.plugins).every(
			(plugin) => plugin.onLoadFinished !== false,
		);
		if (allLoaded) return;
		await sleep(50);
	}
}

/**
 * Some events don't fire when the app first loads. Add more here as needed.
 */

export const triggerWorkspaceEventsAfterPluginsLoaded = async (app: o.App) => {
	await waitForPluginsToLoad(app);
	app.workspace.trigger("layout-change");
	console.info(`::`, "triggering");

	for (const leaf of getMarkdownLeaves(app)) {
		app.workspace.trigger("leaf-created", leaf);
		app.workspace.trigger("file-opened", leaf);
	}
};
