import { addCommand } from "../../add-command";
import { getEditor } from "../../utils/obsidian/editor/get-editor";
import { getUtils } from "../../utils/obsidian/get-plugin";
import GoToHeaderPlugin from "./index";

export const openHeaderSuggestModal = (plugin: GoToHeaderPlugin) => {
	const { app } = plugin;

	getUtils(app).openHeaderSuggestModal(plugin, {
		onChooseSuggestion: async ({ file, heading }) => {
			await app.workspace.openLinkText(file.path, "", false);
			const editor = getEditor(app);
			const loc = heading.position.end;
			const pos = { line: loc.line, ch: loc.col };
			editor.setCursor(pos);
			editor.scrollIntoView({ from: pos, to: pos }, true);
		},
	});
};

export const addOpenHeaderSuggestModalCmd = addCommand<GoToHeaderPlugin>(
	"Go to Header",
	openHeaderSuggestModal,
	{ icon: "target" },
);
