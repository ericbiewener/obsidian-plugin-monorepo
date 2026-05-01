import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { MOOD_VIEW_TYPE, MoodView } from "./mood-view";

export default class MoodTrackerPlugin extends o.Plugin {
	readonly markdownPinnedFiles = new Set<string>();

	async onload() {
		this.registerView(MOOD_VIEW_TYPE, (leaf) => new MoodView(leaf, this));

		this.registerEvent(
			this.app.workspace.on("file-open", (file) => {
				if (!file) return;
				if (this.markdownPinnedFiles.has(file.path)) return;

				const metadata = this.app.metadataCache.getFileCache(file);
				if (!metadata?.frontmatter?.["mood-tracker"]) return;

				const leaf = this.app.workspace.activeLeaf;
				if (!leaf || leaf.view.getViewType() !== "markdown") return;

				leaf.setViewState({ type: MOOD_VIEW_TYPE, state: { file: file.path } });
			}),
		);

		openCalendarView(this);
	}
}

const openCalendarView = addCommand(
	"Open calendar view",
	(plugin: MoodTrackerPlugin) => {
		const file = plugin.app.workspace.getActiveFile();
		if (!file) return;

		const metadata = plugin.app.metadataCache.getFileCache(file);
		if (!metadata?.frontmatter?.["mood-tracker"]) return;

		const leaf = plugin.app.workspace.activeLeaf;
		if (!leaf) return;

		plugin.markdownPinnedFiles.delete(file.path);
		leaf.setViewState({ type: MOOD_VIEW_TYPE, state: { file: file.path } });
	},
);
