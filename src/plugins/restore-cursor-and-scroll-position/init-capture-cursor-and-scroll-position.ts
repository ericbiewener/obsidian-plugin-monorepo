import { getUtils } from "../../utils/obsidian/get-plugin";
import { getActiveView } from "../../utils/obsidian/workspace/get-active-view";
import RestoreCursorAndScrollPositionPlugin from "./index";

export const initCaptureCursorAndScrollPosition = (
	plugin: RestoreCursorAndScrollPositionPlugin,
) => {
	const { app, data } = plugin;
	const utils = getUtils(app);

	document.addEventListener("selectionchange", () => {
		const selection = document.getSelection();
		if (!selection?.anchorNode) return;

		const view = getActiveView(app);
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

		const filePos = utils.objGetOrSet(data.positions, file.path, {});
		filePos.cursor = { from, to };
		plugin.debouncedSaveData(data);
	});
};
