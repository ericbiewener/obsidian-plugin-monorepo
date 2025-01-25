import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { getUtils } from "../../utils/obsidian/get-plugin";

const unorderedListItem = /^(\s*)-( .*)/;

const toggleListType = async ({ app }: o.Plugin) => {
	const editor = getUtils(app).getEditor(app);
	const lineNo = editor.getCursor("from").line;
	const line = editor.getLine(lineNo);

	app.commands.executeCommandById(
		unorderedListItem.test(line)
			? "editor:toggle-numbered-list"
			: "editor:toggle-bullet-list",
	);
};

export const addtoggleListTypeCmd = addCommand(
	"Toggle list type",
	toggleListType,
	{ icon: "list" },
);
