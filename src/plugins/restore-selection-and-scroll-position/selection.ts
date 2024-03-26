import { getUtils } from "../../utils/obsidian/get-plugin";
import { getActiveView } from "../../utils/obsidian/workspace/get-active-view";
import RestoreSelectionAndScrollPositionPlugin from "./index";

export const trackSelectionChanges = (
	plugin: RestoreSelectionAndScrollPositionPlugin,
) => {
	const { app, data } = plugin;
	const utils = getUtils(app);

	document.addEventListener("selectionchange", async () => {
		// Hack. Simply changing files causes the selectionchange event to fire 3
		// times with whatever Obsidian initializes the selection to be, which is
		// *not* what we want to actually track. 1000ms is surely far more than
		// needed, but the failure mode is a major edge case, requiring the user to
		// interact with the file before the 1000ms expires, and then *not*
		// interact with it again. In such a case, we would fail to track the
		// selection made within that 1000ms.
		await utils.sleep(1000);
		const selection = document.getSelection();
		if (!selection?.anchorNode) return;

		const view = getActiveView(app);
		view?.leaf;
		if (!view) return;

		const file = app.workspace.getActiveFile();
		if (!file) return;

		const el = Array.from(
			document.querySelectorAll(
				".cm-content.cm-lineWrapping[contenteditable=true]",
			),
		).find((el) => el.contains(selection.anchorNode));

		if (!el || !view.contentEl.contains(el)) return;

		const from = view.editor.getCursor("from");
		const to = view.editor.getCursor("to");

		const filePos = utils.objGetOrSet(data, file.path, {});
		filePos.selection = { from, to };
		console.info(`::`, "selectionchange", file.path, filePos.selection);
		plugin.debouncedSaveData(data);
	});
};

export const restoreSelectionChanges = (
	plugin: RestoreSelectionAndScrollPositionPlugin,
) => {
	const { app, data } = plugin;

	app.workspace.on("file-opened", ({ view }) => {
		const pos = data[view.file.path];
		if (!pos) return;
		console.info(
			`::`,
			"restoreSelectionChanges file-opened",
			view.file.path,
			data[view.file.path]?.selection,
		);

		const { editor } = view;
		if (pos.selection) {
			editor.setSelection(pos.selection.from, pos.selection.to);
		}
	});
};
