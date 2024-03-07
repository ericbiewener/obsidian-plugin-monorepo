import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { getEditor } from "../../utils/obsidian/editor/get-editor";
import { replaceLinesViaRegex } from "../../utils/obsidian/editor/replace-lines-via-regex";

const demoteHeadings = ({ app }: o.Plugin) => {
	const editor = getEditor(app);
	replaceLinesViaRegex(editor, /^(#+) /gm, (match, group1) => `${group1}# `);
};

export const addDemoteHeadingsCmd = addCommand(
	"Demote headings",
	demoteHeadings,
);
