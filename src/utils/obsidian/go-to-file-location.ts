import * as o from "obsidian";
type Pos = { line: number; col: number };

export const goToFileLocation = async (
	app: o.App,
	file: o.TFile,
	start: Pos,
) => {
	const eState = {
		active: true,
		focus: true,
		line: start.line,
	};

	const leaf = app.workspace.getLeaf(false);
	await leaf.openFile(file, { active: true, eState });
};
