import * as o from "obsidian";

export const createFile = async (
	app: o.App,
	filepath: string,
	data = "",
	open = true,
) => {
	filepath = filepath.trim();
	await app.vault.create(filepath, data);
	if (open) {
		await app.workspace.openLinkText(filepath, "", false);
	}
};
