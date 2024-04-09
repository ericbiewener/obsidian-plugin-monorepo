import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { getUtils } from "../../utils/obsidian/get-plugin";

const demoteHeadings = ({ app }: o.Plugin) => {
	const utils = getUtils(app);
	const editor = utils.getEditor(app);
	utils.replaceLinesViaRegex(
		editor,
		/^(#+) /gm,
		(match, group1) => `${group1}# `,
	);
};

export const addDemoteHeadingsCmd = addCommand(
	"Demote headings",
	demoteHeadings,
);
