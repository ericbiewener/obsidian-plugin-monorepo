import debounce from "debounce";
import * as o from "obsidian";
import { waitForFileOpenToFireOnce } from "../../utils/obsidian/workspace/once-on-file-open";
import { initCaptureCursorAndScrollPosition } from "./init-capture-cursor-and-scroll-position";

type Data = {
	positions: Record<string, { cursor?: o.EditorRange; scroll?: number }>;
};

const loadData = async (plugin: RestoreCursorAndScrollPositionPlugin) => {
	const [loadedData] = await Promise.all([
		plugin.loadData(),
		waitForFileOpenToFireOnce(plugin.app),
	]);
	plugin.data = loadedData || { positions: {} };
	for (const file of plugin.app.vault.getMarkdownFiles()) {
		const pos = plugin.data.positions[file.path];
		if (pos) {
			plugin.data.positions[file.path] = pos;
		}
	}
};

export default class RestoreCursorAndScrollPositionPlugin extends o.Plugin {
	data: Data = {
		positions: {},
	};

	async onload() {
		console.info(":: restore-cursor-and-scroll-position plugin init");
		await loadData(this);
		initCaptureCursorAndScrollPosition(this);
		console.info(`:: plugin.data`, this.data);
	}

	// Obsidian provides a `debounce` function via its api (o.debounce) but it is
	// actually a throttle function:
	// https://forum.obsidian.md/t/the-debounce-function-provided-by-the-api-is-actually-a-throttle-function/79147
	debouncedSaveData = debounce(this.saveData, 1000);
}
