import { getUtils } from "../../utils/obsidian/get-plugin";
import RestoreSelectionAndScrollPositionPlugin from "./index";

declare module "../../types/obsidian" {
	interface MarkdownLeaf {
		_hasRestoreScrollListener: boolean;
	}
}

export const trackScrollChanges = (
	plugin: RestoreSelectionAndScrollPositionPlugin,
) => {
	const { app, data } = plugin;
	const utils = getUtils(app);

	app.workspace.on("leaf-created", (leaf) => {
		console.info(`::`, "trackScrollChanges leaf-created", leaf.view.file.path);
		if (leaf._hasRestoreScrollListener) return;
		leaf._hasRestoreScrollListener = true;

		const { view } = leaf;

		const { scrollDOM } = view.editor.cm;
		scrollDOM.addEventListener("scroll", () => {
			const filePos = utils.objGetOrSet(data, view.file.path, {});
			filePos.scroll = scrollDOM.scrollTop;
			console.info(`::`, "scrollchange", view.file.path, filePos.scroll);
			plugin.debouncedSaveData(data);
		});
	});
};

export const restoreScrollChanges = (
	plugin: RestoreSelectionAndScrollPositionPlugin,
) => {
	const { app, data } = plugin;
	app.workspace.on("file-opened", ({ view }) => {
		console.info(
			`::`,
			"restoreScrollChanges file-opened",
			view.file.path,
			data[view.file.path]?.scroll,
		);
		const pos = data[view.file.path];
		if (!pos) return;

		const { scroll } = pos;
		if (scroll) view.editor.cm.scrollDOM.scrollTop = scroll;
	});
};
