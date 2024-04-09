import debounce from "debounce";
import * as o from "obsidian";
import { waitForUtilsPluginInit } from "../../utils/obsidian/wait-for-utils-plugin-init";
import { restoreScrollChanges, trackScrollChanges } from "./scroll";
import { restoreSelectionChanges, trackSelectionChanges } from "./selection";

type Data = Record<
	string,
	{
		selection?: o.EditorRange;
		scroll?: number;
	}
>;

const loadData = async (plugin: RestoreSelectionAndScrollPositionPlugin) => {
	const { app } = plugin;
	const utils = await waitForUtilsPluginInit(app);
	const [loadedData] = await Promise.all([
		plugin.loadData(),
		utils.waitForEventToFireOnce(app, "file-open"),
	]);
	plugin.data = loadedData || { positions: {} };
	for (const file of app.vault.getMarkdownFiles()) {
		const pos = plugin.data[file.path];
		if (pos) {
			plugin.data[file.path] = pos;
		}
	}
};

export default class RestoreSelectionAndScrollPositionPlugin extends o.Plugin {
	data: Data = {};

	// Obsidian tracks whether plugins are loaded via a `_loaded` property. This
	// is problematic for a couple reasons:
	// 1. It is not part of the official API, so it could change in the future.
	// 2. It doesn't indicate that the plugin's `onload` method has finished
	//    running. Perhaps it is tracking just that `onLoad` has *started*?
	onLoadFinished = false;

	async onload() {
		console.info(":: restore-selection-and-scroll-position plugin init");
		await loadData(this);
		console.info(`:: plugin.data`, this.data);

		trackScrollChanges(this);
		restoreScrollChanges(this);
		trackSelectionChanges(this);
		restoreSelectionChanges(this);

		this.onLoadFinished = true;
	}

	// Obsidian provides a `debounce` function via its api (o.debounce) but it is
	// actually a throttle function:
	// https://forum.obsidian.md/t/the-debounce-function-provided-by-the-api-is-actually-a-throttle-function/79147
	debouncedSaveData = debounce(this.saveData, 1000);
}
