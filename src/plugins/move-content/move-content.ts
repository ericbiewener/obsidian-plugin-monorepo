import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { EDITOR_LINE_CLASS_NAME } from "../../contants";
import { getEditor } from "../../utils/obsidian/editor/get-editor";
import { getPlugin, getUtils } from "../../utils/obsidian/get-plugin";
import { getActiveFile } from "../../utils/obsidian/workspace/get-active-file";
import { getActiveView } from "../../utils/obsidian/workspace/get-active-view";
import MoveContentPlugin from "./index";
import style from "./style/style.module.css";

export const createIndicator = () => {
	const indicator = document.body.createEl("button");
	indicator.classList.add(style.indicator, "mod-cta");
	indicator.textContent = "Cancel Move Content";
	console.info("indicator", indicator);
	return indicator;
};

const getLinesToMove = (app: o.App) => {
	const editor = getEditor(app);
	const from = editor.getCursor("from").line;
	const line = editor.getLine(from);
	const utils = getUtils(app);
	const isList = utils.syntax.isList(line);
	return isList ? utils.getListChildren(editor, from) : { from, to: from };
};

const createClickHandler =
	(
		app: o.App,
		originalFile: o.TFile,
		txt: string,
		originalLines: { from: number; to: number },
		cancel: () => void,
	) =>
	async ({ target }: MouseEvent) => {
		const el =
			target instanceof HTMLElement
				? target.closest(`.${EDITOR_LINE_CLASS_NAME}`)
				: null;
		if (!el) return;

		const utils = getUtils(app);
		const editor = getEditor(app);
		const from = editor.getCursor("from");

		utils.insertText(editor, `\n${txt}`, { line: from.line, ch: Infinity });
		cancel();

		await app.workspace.openLinkText(originalFile.path, "", false);
		console.info(
			"deleting",
			getEditor(app),
			originalLines.from,
			originalLines.to,
		);
		utils.deleteLines(getEditor(app), originalLines.from, originalLines.to);
	};

const moveContent = async (plugin: MoveContentPlugin) => {
	const { app } = plugin;
	const lines = getLinesToMove(app);
	const utils = getUtils(app);
	const editor = getEditor(app);
	const txt = utils.getLines(editor, lines.from, lines.to);
	const originalFile = getActiveFile(app);
	await getPlugin(app, "better-file-switcher").openFileSuggestModal();

	const view = getActiveView(app);
	if (!view) return;

	const indicator = createIndicator();

	const cancel = () => {
		indicator.remove();
		view.contentEl.removeEventListener("click", handleClick);
	};

	const handleClick = createClickHandler(app, originalFile, txt, lines, cancel);
	view.contentEl.addEventListener("click", handleClick);
	indicator.addEventListener("click", cancel);
};

export const addMoveContentCmd = addCommand("Move Content", moveContent);
